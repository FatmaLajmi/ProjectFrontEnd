import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASEURL = process.env.REACT_APP_BASEURL;

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [productSelected, setProductSelected] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("");
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
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

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/products`);
      setProducts(response.data);
    } catch (error) {
      handleErrorFromApi(error, "Error fetching products");
    } finally {
      setIsLoading(false);
    }
  };

  const getProductsByCategory = async (categoryId = "") => {
    try {
      setIsLoading(true);
      const url = categoryId 
        ? `${BASEURL}/products/search?category=${categoryId}`
        : `${BASEURL}/products`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      handleErrorFromApi(error, "Error fetching products by category");
    } finally {
      setIsLoading(false);
    }
  };

  const getProductById = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/products/${id}`);
      setProductSelected(response.data);
    } catch (error) {
      handleErrorFromApi(error, `Error fetching product with id: ${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (productData) => {
    if (!user) return handleSessionExpired();
    if (!isAdmin) return handleAccessDenied();

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASEURL}/products`, productData, {
        headers: getAuthHeader(),
      });
      if (response) {
        getAllProducts();
      }
    } catch (error) {
      handleErrorFromApi(error, "Error creating product");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id, updatedData) => {
    if (!user) return handleSessionExpired();
    if (!isAdmin) return handleAccessDenied();

    try {
      setIsLoading(true);
      const response = await axios.put(`${BASEURL}/products/${id}`, updatedData, {
        headers: getAuthHeader(),
      });
      if (response) {
        setProductSelected(response.data);
        getAllProducts();
      }
    } catch (error) {
      handleErrorFromApi(error, `Error updating product with id: ${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!user) return handleSessionExpired();
    if (!isAdmin) return handleAccessDenied();

    try {
      setIsLoading(true);
      await axios.delete(`${BASEURL}/products/${id}`, {
        headers: getAuthHeader(),
      });
      setProductSelected(null);
      getAllProducts();
    } catch (error) {
      handleErrorFromApi(error, `Error deleting product with id: ${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Event Handlers ---

  const handleShowModal = (action, product) => {
    setModalAction(action);
    if (action === "update" && product) {
      setProductData({
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category?._id || "",
        stock: product.stock,
      });
      setProductSelected(product);
    } else {
      setProductData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
      });
      setProductSelected(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      stock: "",
    });
    setProductSelected(null);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmitForm = async () => {
    try {
      if (modalAction === "create") {
        await createProduct(productData);
      } else if (modalAction === "update" && productSelected) {
        await updateProduct(productSelected._id, productData);
      }
      handleCloseModal();
    } catch (err) {
      console.error("Error submitting product form", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
      } catch (err) {
        console.error("Error deleting product", err);
      }
    }
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
    getProductsByCategory,
    getProductById,
    handleSubmitForm,
    handleShowModal,
    handleCloseModal,
    handleDeleteProduct,
    handleInputChange,
  };
};

export default useProducts;