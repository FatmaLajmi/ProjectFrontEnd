import { useState } from 'react'
import axios from 'axios'

const BASEURL = process.env.REACT_APP_BASEURL

const useOrders = () => {
    const [orders, setOrders] = useState([])
    const [orderSelected, setOrderSelected] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)



    const [showModal, setShowModal] = useState(false);

    const [modalAction, setModalAction] = useState('create');

    const [orderData, setOrderData] = useState({
    user: '',
    products: [{ product: '', quantity: 1 }],
    totalPrice: 0,
    status: 'pending'
    });


    const getAllOrders = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASEURL}/orders`)
            setOrders(response.data)
        } catch (error) {
            setError(error.response?.data?.message || 'Error fetching orders')
            console.error("Error getting all orders", error)
        } finally {
            setIsLoading(false)
        }
    }

    const getOrderById = async (id) => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASEURL}/orders/${id}`)
            setOrderSelected(response.data)
        } catch (error) {
            setError(error.response?.data?.message || `Error fetching order with id: ${id}`)
            console.error("Error getting order by id", error)
        } finally {
            setIsLoading(false)
        }
    }

    const createOrder = async (orderData) => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${BASEURL}/orders`, orderData);
            if (response) {
                getAllOrders()
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating order');
            console.error("Error creating order", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateOrder = async (id, updatedData) => {
        try {
            setIsLoading(true)
            const response = await axios.put(`${BASEURL}/orders/${id}`, updatedData)
            if (response) {
                setOrderSelected(response.data.payload)
            }
            getAllOrders()
        } catch (error) {
            setError(error.response?.data?.message || `Error updating order with id: ${id}`)
            console.error("Error updating order", error)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteOrder = async (id) => {
        try {
            setIsLoading(true)
            await axios.delete(`${BASEURL}/orders/${id}`)
            setOrderSelected(null)
            getAllOrders();
        } catch (error) {
            setError(error.response?.data?.message || `Error deleting order with id: ${id}`)
            console.error("Error deleting order", error)
        } finally {
            setIsLoading(false)
        }
    }


    // --- Event Handlers ---

    const handleShowModal = (action, order) => {
        setModalAction(action);
        if (action === 'update' && order) {
            setOrderData({ id: order._id, user: order.user, products: order.products, totalPrice: order.totalPrice, status: order.status });
            setOrderSelected(order);
        } else {
            setOrderData({user: '', products: [{ product: '', quantity: 1 }], totalPrice: 0, status: 'pending'});
            setOrderSelected(null);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setOrderData({user: '', products: [{ product: '', quantity: 1 }], totalPrice: 0, status: 'pending'});
        setOrderSelected(null);
        setError(null)
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData({ ...orderData, [name]: value });
    };

    const handleSubmitForm = async () => {
        try {
            if (modalAction === 'create') {
                await createOrder(orderData);
            } else if (modalAction === 'update' && orderSelected) {
                await updateOrder(orderSelected._id, orderData);
            }
            handleCloseModal();
            getAllOrders();
        } catch (err) {
            alert("Error updating order");
        }
    }

    const handleDeleteOrder = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(id);
                getAllOrders();
            } catch (err) {
                alert("Error deleting order");
            }
        }
    };

    const handleRemoveProduct = async (indexToRemove) => {
    const updatedProducts = orderData.products.filter((_, idx) => idx !== indexToRemove);

    const updatedOrder = {
        ...orderData,
        products: updatedProducts
    };

    setOrderData(updatedOrder); 

    try {
        await updateOrder(orderData._id, updatedOrder);
    } catch (error) {
        console.error('Failed to remove product from order:', error);
    }
    };

    return {
        orders,
        orderData,
        isLoading,
        error,
        showModal,
        modalAction,
        getAllOrders,
        handleSubmitForm,
        handleShowModal,
        handleCloseModal,
        handleDeleteOrder,
        handleInputChange,
        getOrderById,
        handleRemoveProduct
    };
}

export default useOrders