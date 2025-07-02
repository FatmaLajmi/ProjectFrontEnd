import { useState } from 'react'
import axios from 'axios'

// It's good you're using an environment variable for the base URL!
const BASEURL = process.env.REACT_APP_BASEURL

const useUsers = () => {
    const [users, setUsers] = useState([])
    const [userSelected, setUserSelected] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)



    const [showModal, setShowModal] = useState(false);

    const [modalAction, setModalAction] = useState('create');

    const [userData, setUserData] = useState({ id: '', name: '', email: '', password:'', image:'', isAdmin:'' });

    const getAllUsers = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASEURL}/users`)
            setUsers(response.data)
        } catch (error) {
            setError(error.response?.data?.message || 'Error fetching users')
            console.error("Error getting all users", error)
        } finally {
            setIsLoading(false)
        }
    }

    const getUserById = async (id) => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASEURL}/users/${id}`)
            setUserSelected(response.data)
        } catch (error) {
            setError(error.response?.data?.message || `Error fetching user with id: ${id}`)
            console.error("Error getting user by id", error)
        } finally {
            setIsLoading(false)
        }
    }

    const createUser = async (userData) => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${BASEURL}/users`, userData);
            if (response) {
                getAllUsers()
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating user');
            console.error("Error creating user", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (id, updatedData) => {
        try {
            setIsLoading(true)
            const response = await axios.put(`${BASEURL}/users/${id}`, updatedData)
            if (response) {
                setUserSelected(response.data.payload)
            }
            getAllUsers()
        } catch (error) {
            setError(error.response?.data?.message || `Error updating user with id: ${id}`)
            console.error("Error updating user", error)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteUser = async (id) => {
        try {
            setIsLoading(true)
            await axios.delete(`${BASEURL}/users/${id}`)
            setUserSelected(null)
            getAllUsers();
        } catch (error) {
            setError(error.response?.data?.message || `Error deleting user with id: ${id}`)
            console.error("Error deleting user", error)
        } finally {
            setIsLoading(false)
        }
    }


    // --- Event Handlers ---

    const handleShowModal = (action, user) => {
        setModalAction(action);
        if (action === 'update' && user) {
            setUserData({ id: user._id, name: user.name, email:user.email, password: user.password, image: user.image, isAdmin: user.isAdmin });
            setUserSelected(user);
        } else {
            setUserData({ id: '', name: '', email: '', password:'', image:'', isAdmin:''});
            setUserSelected(null);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setUserData({ id: '', name: '', email: '', password:'', image:'', isAdmin:''});
        setUserSelected(null);
        setError(null)
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData({ ...userData, [name]: type === 'checkbox' ? checked : value}); // Set 'checked' for checkboxes, 'value' for others 
    };

    const handleSubmitForm = async () => {
        try {
            if (modalAction === 'create') {
                await createUser(userData);
            } else if (modalAction === 'update' && userSelected) {
                await updateUser(userSelected._id, userData);
            }
            handleCloseModal();
            getAllUsers();
        } catch (err) {
            alert("Error updating user");
        }
    }

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id);
                getAllUsers(); // Refresh the list after deletion.
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
        getUserById
    };
}

export default useUsers