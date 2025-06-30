import { useState } from 'react'
import axios from 'axios'

// It's good you're using an environment variable for the base URL!
const BASEURL = process.env.REACT_APP_BASEURL

const useExamples = () => {
    const [examples, setExamples] = useState([])
    const [exampleSelected, setExampleSelected] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)



    const [showModal, setShowModal] = useState(false);

    const [modalAction, setModalAction] = useState('create');

    const [exampleData, setExampleData] = useState({ id: '', name: '', description: '' });

    const getAllExamples = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASEURL}/examples`)
            setExamples(response.data)
        } catch (error) {
            setError(error.response?.data?.message || 'Error fetching examples')
            console.error("Error getting all examples", error)
        } finally {
            setIsLoading(false)
        }
    }

    const getExampleById = async (id) => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASEURL}/examples/${id}`)
            setExampleSelected(response.data)
        } catch (error) {
            setError(error.response?.data?.message || `Error fetching example with id: ${id}`)
            console.error("Error getting example by id", error)
        } finally {
            setIsLoading(false)
        }
    }

    const createExample = async (exampleData) => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${BASEURL}/examples`, exampleData);
            if (response) {
                getAllExamples()
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating example');
            console.error("Error creating example", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateExample = async (id, updatedData) => {
        try {
            setIsLoading(true)
            const response = await axios.put(`${BASEURL}/examples/${id}`, updatedData)
            if (response) {
                setExampleSelected(response.data.payload)
            }
            getAllExamples()
        } catch (error) {
            setError(error.response?.data?.message || `Error updating example with id: ${id}`)
            console.error("Error updating example", error)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteExample = async (id) => {
        try {
            setIsLoading(true)
            await axios.delete(`${BASEURL}/examples/${id}`)
            setExampleSelected(null)
            getAllExamples();
        } catch (error) {
            setError(error.response?.data?.message || `Error deleting example with id: ${id}`)
            console.error("Error deleting example", error)
        } finally {
            setIsLoading(false)
        }
    }


    // --- Event Handlers ---

    const handleShowModal = (action, example) => {
        setModalAction(action);
        if (action === 'update' && example) {
            setExampleData({ id: example._id, name: example.name, description: example.description });
            setExampleSelected(example);
        } else {
            setExampleData({ id: '', name: '', description: '' });
            setExampleSelected(null);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setExampleData({ id: '', name: '', description: '' });
        setExampleSelected(null);
        setError(null)
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExampleData({ ...exampleData, [name]: value });
    };

    const handleSubmitForm = async () => {
        try {
            if (modalAction === 'create') {
                await createExample(exampleData);
            } else if (modalAction === 'update' && exampleSelected) {
                await updateExample(exampleSelected._id, exampleData);
            }
            handleCloseModal();
            getAllExamples();
        } catch (err) {
            alert("Error updating example");
        }
    }

    const handleDeleteExample = async (id) => {
        if (window.confirm('Are you sure you want to delete this example?')) {
            try {
                await deleteExample(id);
                getAllExamples(); // Refresh the list after deletion.
            } catch (err) {
                alert("Error deleting example");
            }
        }
    };

    return {
        examples,
        exampleData,
        isLoading,
        error,
        showModal,
        modalAction,
        getAllExamples,
        handleSubmitForm,
        handleShowModal,
        handleCloseModal,
        handleDeleteExample,
        handleInputChange,
        getExampleById
    };
}

export default useExamples