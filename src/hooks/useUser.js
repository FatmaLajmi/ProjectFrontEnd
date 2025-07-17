import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASEURL = process.env.REACT_APP_BASEURL;

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    image: "",
    isAdmin: "",
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

  const getAllUsers = async () => {
    if (!user) return handleSessionExpired();
    if (!isAdmin) return handleAccessDenied();

    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/users`, {
        headers: getAuthHeader(),
      });
      setUsers(response.data);
    } catch (error) {
      handleErrorFromApi(error, "Error fetching users");
    } finally {
      setIsLoading(false);
    }
  };

  const getUserById = async (id) => {
    if (!user) return handleSessionExpired();

    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/users/${id}`, {
        headers: getAuthHeader(),
      });
      setUserSelected(response.data);
    } catch (error) {
      handleErrorFromApi(error, `Error fetching user with id: ${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (userData) => {
    if (!user) return handleSessionExpired();
    if (!isAdmin) return handleAccessDenied();

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASEURL}/users`, userData, {
        headers: getAuthHeader(),
      });
      if (response) {
        getAllUsers();
      }
    } catch (error) {
      handleErrorFromApi(error, "Error creating user");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id, updatedData) => {
    if (!user) return handleSessionExpired();
    if (!isAdmin) return handleAccessDenied();

    try {
      setIsLoading(true);
      const response = await axios.put(`${BASEURL}/users/${id}`, updatedData, {
        headers: getAuthHeader(),
      });
      if (response) {
        setUserSelected(response.data);
        getAllUsers();
      }
    } catch (error) {
      handleErrorFromApi(error, `Error updating user with id: ${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!user) return handleSessionExpired();
    if (!isAdmin) return handleAccessDenied();

    try {
      setIsLoading(true);
      await axios.delete(`${BASEURL}/users/${id}`, {
        headers: getAuthHeader(),
      });
      setUserSelected(null);
      getAllUsers();
    } catch (error) {
      handleErrorFromApi(error, `Error deleting user with id: ${id}`);
    } finally {
      setIsLoading(false);
    }
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

  // --- Event Handlers ---

  const handleShowModal = (action, user) => {
    setModalAction(action);
    if (action === "update" && user) {
      setUserData({
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
        isAdmin: user.isAdmin,
      });
      setUserSelected(user);
    } else {
      setUserData({
        id: "",
        name: "",
        email: "",
        password: "",
        image: "",
        isAdmin: "",
      });
      setUserSelected(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserData({
      id: "",
      name: "",
      email: "",
      password: "",
      image: "",
      isAdmin: "",
    });
    setUserSelected(null);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({ ...userData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmitForm = async () => {
    try {
      if (modalAction === "create") {
        await createUser(userData);
      } else if (modalAction === "update" && userSelected) {
        await updateUser(userSelected._id, userData);
      }
      handleCloseModal();
      getAllUsers();
    } catch (err) {
      alert("Error submitting user form");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        getAllUsers();
      } catch (err) {
        alert("Error deleting user");
      }
    }
  };

  return {
    users,
    userData,
    isLoading,
    error,
    showModal,
    modalAction,
    getAllUsers,
    handleSubmitForm,
    handleShowModal,
    handleCloseModal,
    handleDeleteUser,
    handleInputChange,
    getUserById,
  };
};

export default useUsers;
