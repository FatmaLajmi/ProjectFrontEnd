import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASEURL = process.env.REACT_APP_BASEURL;

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
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

  const getAllCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/categories`);
      setCategories(response.data);
    } catch (error) {
      handleErrorFromApi(error, "Error fetching categories");
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryById = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/categories/${id}`);
      setCategorySelected(response.data);
    } catch (error) {
      handleErrorFromApi(error, `Error fetching category with id: ${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    if (!user) return handleSessionExpired();
    if (!isAdmin) return handleAccessDenied();

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASEURL}/categories`, categoryData, {
        headers: getAuthHeader(),
      });
      if (response) {
        getAllCategories();
      }
    } catch (error) {
      handleErrorFromApi(error, "Error creating category");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = async (id, updatedData) => {
    if (!user) return handleSessionExpired();
    if (!isAdmin) return handleAccessDenied();

    try {
      setIsLoading(true);
      const response = await axios.put(`${BASEURL}/categories/${id}`, updatedData, {
        headers: getAuthHeader(),
      });
      if (response) {
        setCategorySelected(response.data);
        getAllCategories();
      }
    } catch (error) {
      handleErrorFromApi(error, `Error updating category with id: ${id}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!user) return handleSessionExpired();
    if (!isAdmin) return handleAccessDenied();

    try {
      setIsLoading(true);
      await axios.delete(`${BASEURL}/categories/${id}`, {
        headers: getAuthHeader(),
      });
      setCategorySelected(null);
      getAllCategories();
    } catch (error) {
      handleErrorFromApi(error, `Error deleting category with id: ${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Event Handlers ---

  const handleShowModal = (action, category) => {
    setModalAction(action);
    if (action === "update" && category) {
      setCategoryData({
        name: category.name,
        description: category.description,
      });
      setCategorySelected(category);
    } else {
      setCategoryData({ name: "", description: "" });
      setCategorySelected(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCategoryData({ name: "", description: "" });
    setCategorySelected(null);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
    setError(null);
  };

  const handleSubmitForm = async () => {
    try {
      if (modalAction === "create") {
        await createCategory(categoryData);
      } else if (modalAction === "update" && categorySelected) {
        await updateCategory(categorySelected._id, categoryData);
      }
      handleCloseModal();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Operation failed";
      setError(errorMessage); 
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
      } catch (err) {
        console.error("Error deleting category", err);
      }
    }
  };

  return {
    categories,
    categoryData,
    isLoading,
    error,
    showModal,
    modalAction,
    getAllCategories,
    getCategoryById,
    handleSubmitForm,
    handleShowModal,
    handleCloseModal,
    handleDeleteCategory,
    handleInputChange,
  };
};

export default useCategories;