import { useState } from 'react'
import axios from 'axios'
import useCategories from './useCategory'

const BASEURL = process.env.REACT_APP_BASEURL

const useProducts = () => {
    const [products, setProducts] = useState([])
    const [productselected, setProductselected] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState('create');
    const [selectedFilterCategory, setSelectedFilterCategory] = useState('');
    const [productData, setProductData] = useState({ 
    id: '', 
    name: '', 
    description: '', 
    price:'', 
    image:'', 
    category: '',
    stock:''
});

    const getAllProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASEURL}/products`)

            setProducts(response.data)
        } catch (error) {
            setError(error.response?.data?.message || 'Error fetching products')
            console.error("Error getting all products", error)
        } finally {
            setIsLoading(false)
        }
    }

    const getProductsByCategory = async (categoryId = '') => {
        setIsLoading(true);
        setError(null);
        try {
            let url = 'http://localhost:3000/products';
            if (categoryId) {
                url = `http://localhost:3000/products/search?category=${categoryId}`;
            }

            const productsResponse = await axios.get(url);
            setProducts(productsResponse.data);
        } catch (err) {
            setError(err);
            console.error("Failed to fetch products:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const getProductById = async (id) => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASEURL}/products/${id}`)
            setProductselected(response.data)
        } catch (error) {
            setError(error.response?.data?.message || `Error fetching product with id: ${id}`)
            console.error("Error getting product by id", error)
        } finally {
            setIsLoading(false)
        }
    }

    const createProduct = async (productData) => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${BASEURL}/products`, productData);
            if (response) {
                getAllProducts()
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating product');
            console.error("Error creating product", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateProduct = async (id, updatedData) => {
        try {
            setIsLoading(true)
            const response = await axios.put(`${BASEURL}/products/${id}`, updatedData)
            if (response) {
                setProductselected(response.data.payload)
            }
            getAllProducts()
        } catch (error) {
            setError(error.response?.data?.message || `Error updating product with id: ${id}`)
            console.error("Error updating product", error)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteProduct = async (id) => {
        try {
            setIsLoading(true)
            await axios.delete(`${BASEURL}/products/${id}`)
            setProductselected(null)
            getAllProducts();
        } catch (error) {
            setError(error.response?.data?.message || `Error deleting product with id: ${id}`)
            console.error("Error deleting product", error)
        } finally {
            setIsLoading(false)
        }
    }

    // --- Event Handlers ---

    const handleShowModal = (action, product) => {
        setModalAction(action);
        if (action === 'update' && product) {
            setProductData({ id: product._id, name: product.name, description: product.description, price: product.price, image: product.image, category: product.category._id, stock: product.stock });
            setProductselected(product);
        } else {
            setProductData({id: '', name: '', description: '', price:'', image:'', category:'', stock:''});
            setProductselected(null);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setProductData({id: '', name: '', description: '', price:'', image:'', category:'', stock:''});
        setProductselected(null);
        setError(null)
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmitForm = async () => {
        try {
            if (modalAction === 'create') {
                await createProduct(productData);
            } else if (modalAction === 'update' && productselected) {
                await updateProduct(productselected._id, productData);
            }
            handleCloseModal();
            getAllProducts();
        } catch (err) {
            alert("Error updating product");
        }
        getProductsByCategory(selectedFilterCategory); // Refresh products after submission
    }

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                getAllProducts(); 
            } catch (err) {
                alert("Error deleting product");
            }
        }
        getProductsByCategory(selectedFilterCategory);
    };

        return {
        products,
        productData,
        isLoading,
        error,
        showModal,
        modalAction,
        selectedFilterCategory,
        setSelectedFilterCategory,
        getAllProducts,
        handleSubmitForm,
        handleShowModal,
        handleCloseModal,
        handleDeleteProduct,
        handleInputChange,
        getProductById,
        getProductsByCategory
    };
}

export default useProducts;