import { useState } from "react";
import axios from "axios";

const BASEURL = process.env.REACT_APP_BASEURL;

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [modalAction, setModalAction] = useState("create");

  const [categoryData, setCategoryData] = useState({
    id: "",
    name: "",
    description: "",
  });

  const getAllCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/categories`);
      setCategories(response.data);
      console.log("Response:", response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching categories");
      console.error("Error getting all categories", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryById = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/categoriess/${id}`);
      setCategorySelected(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          `Error fetching category with id: ${id}`
      );
      console.error("Error getting category by id", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASEURL}/categories`, categoryData);
      if (response) {
        getAllCategories();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error creating category");
      console.error("Error creating category", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = async (id, updatedData) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${BASEURL}/categories/${id}`,
        updatedData
      );
      if (response) {
        setCategorySelected(response.data.payload);
        getAllCategories();
      }
      
    } catch (error) {
      setError(
        error.response?.data?.message ||
          `Error updating category with id: ${id}`
      );
      console.error("Error updating category", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${BASEURL}/categories/${id}`);
      setCategorySelected(null);
      getAllCategories();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          `Error deleting category with id: ${id}`
      );
      console.error("Error deleting category", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Event Handlers ---

  const handleShowModal = (action, category) => {
    setModalAction(action);
    if (action === "update" && category) {
      setCategoryData({
        id: category._id,
        name: category.name,
        description: category.description,
      });
      setCategorySelected(category);
    } else {
      setCategoryData({ id: "", name: "", description: "" });
      setCategorySelected(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCategoryData({ id: "", name: "", description: "" });
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
      getAllCategories();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error updating category";
      setError(errorMessage); 
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        getAllCategories();
      } catch (err) {
        alert("Error deleting category");
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
    handleSubmitForm,
    handleShowModal,
    handleCloseModal,
    handleDeleteCategory,
    handleInputChange,
    getCategoryById,
  };
};

export default useCategories;
