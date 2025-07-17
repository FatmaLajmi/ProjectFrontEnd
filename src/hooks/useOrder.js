import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASEURL = process.env.REACT_APP_BASEURL;

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState({
    user: "",
    products: [{ product: "", quantity: 1 }],
    totalPrice: 0,
    status: "pending",
  });

  // 🔐 Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;

  const handleSessionExpired = (message = "Session expired. Please login again.") => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert(message);
    navigate("/login", { replace: true });
  };

  const handleAccessDenied = (message = "Access denied. Admins only.") => {
    alert(message);
    navigate("/", { replace: true });
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      handleSessionExpired();
      throw new Error("No token provided");
    }
    return { Authorization: `Bearer ${token}` };
  };

  const handleErrorFromApi = (error, fallbackMessage) => {
    if (error.response?.status === 401) {
      handleSessionExpired();
    } else if (error.response?.status === 403) {
      handleAccessDenied();
    } else {
      setError(error.response?.data?.message || fallbackMessage);
    }
    console.error(fallbackMessage, error);
  };

  // --- API Functions ---

  const getAllOrders = async () => {
    if (!user) return handleSessionExpired();
    if (!isAdmin) return handleAccessDenied();

    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/orders`, {
        headers: getAuthHeader(),
      });
      setOrders(response.data);
    } catch (error) {
      handleErrorFromApi(error, "Error fetching orders");
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = async (id) => {
    if (!user) return handleSessionExpired();
    if (!isAdmin) return handleAccessDenied();

    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/orders/${id}`, {
        headers: getAuthHeader(),
      });
      setOrderSelected(response.data);
    } catch (error) {
      handleErrorFromApi(error, `Error fetching order with id: ${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrdersByUser = async () => {
    if (!user) return handleSessionExpired();

    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/orders`, {
        headers: getAuthHeader(),
      });
      setOrders(response.data);
    } catch (error) {
      handleErrorFromApi(error, "Error fetching user orders");
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    if (!user) return handleSessionExpired();

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASEURL}/orders`, orderData, {
        headers: getAuthHeader(),
      });
      if (response) {
        getOrdersByUser(); // Refresh user's orders after creation
      }
    } catch (error) {
      handleErrorFromApi(error, "Error creating order");
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrder = async (id, updatedData) => {
    if (!user) return handleSessionExpired();

    try {
      setIsLoading(true);
      const response = await axios.put(`${BASEURL}/orders/${id}`, updatedData, {
        headers: getAuthHeader(),
      });
      if (response) {
        setOrderSelected(response.data);
        getOrdersByUser(); // Refresh orders after update
      }
    } catch (error) {
      handleErrorFromApi(error, `Error updating order with id: ${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    if (!user) return handleSessionExpired();

    try {
      setIsLoading(true);
      await axios.delete(`${BASEURL}/orders/${id}`, {
        headers: getAuthHeader(),
      });
      setOrderSelected(null);
      getOrdersByUser(); // Refresh orders after deletion
    } catch (error) {
      handleErrorFromApi(error, `Error deleting order with id: ${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Event Handlers ---

  const handleShowModal = (action, order) => {
    setModalAction(action);
    if (action === "update" && order) {
      setOrderData({
        id: order._id,
        user: order.user,
        products: order.products,
        totalPrice: order.totalPrice,
        status: order.status,
      });
      setOrderSelected(order);
    } else {
      setOrderData({
        user: user?._id || "",
        products: [{ product: "", quantity: 1 }],
        totalPrice: 0,
        status: "pending",
      });
      setOrderSelected(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setOrderData({
      user: user?._id || "",
      products: [{ product: "", quantity: 1 }],
      totalPrice: 0,
      status: "pending",
    });
    setOrderSelected(null);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSubmitForm = async () => {
    try {
      if (modalAction === "create") {
        await createOrder(orderData);
      } else if (modalAction === "update" && orderSelected) {
        await updateOrder(orderSelected._id, orderData);
      }
      handleCloseModal();
    } catch (err) {
      console.error("Error submitting order form", err);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id);
      } catch (err) {
        console.error("Error deleting order", err);
      }
    }
  };

  const handleRemoveProduct = async (indexToRemove) => {
    const updatedProducts = orderData.products.filter(
      (_, idx) => idx !== indexToRemove
    );

    const updatedOrder = {
      ...orderData,
      products: updatedProducts,
    };

    setOrderData(updatedOrder);

    try {
      await updateOrder(orderData._id, updatedOrder);
    } catch (error) {
      console.error("Failed to remove product from order:", error);
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
    getOrderById,
    getOrdersByUser,
    handleSubmitForm,
    handleShowModal,
    handleCloseModal,
    handleDeleteOrder,
    handleInputChange,
    handleRemoveProduct,
  };
};

export default useOrders;