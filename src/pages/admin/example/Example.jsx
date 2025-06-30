import { useEffect } from 'react';
import { Button, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import useExamples from '../../../hooks/useExample.js';
import usePagination from '../../../hooks/usePagination.js';
import { CreateIcon } from '../../../assets/icons/Icons.jsx';  // Import reusable icons
import Loader from '../../../components/loader/Loader.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';
import ExampleModal from './components/ExampleModal.jsx';
import ExampleTable from './components/ExampleTable.jsx';

const ExamplesPage = () => {

const {
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
} = useExamples();


    // 2. Pagination Management (from custom hook)
    // This hook manages the current page, items to display, and total pages

    const { currentPage, currentItems, totalPages, handlePageChange } =
        usePagination(examples, 10);

    useEffect(() => {
        getAllExamples();
    }, []);

    return (
        <div className="container mt-4">
            {/*  Display an error message if there's an error */}
            {error && <Alert variant="danger">{error}</Alert>}

            <div className='d-flex justify-content-between'>
                <h1>Examples List</h1>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="create-tooltip">  Create a new Example </Tooltip>}  // Display "Create a new Example" when hovered
                >
                    <Button
                        variant="primary"
                        onClick={() => handleShowModal('create')}
                        disabled={isLoading}
                    >
                        <CreateIcon />
                    </Button>
                </OverlayTrigger>

            </div>

            {/* Show a loading spinner while data is being fetched */}
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <ExampleTable
                        examples={currentItems} // Pass paginated items
                        onEdit={handleShowModal} // Pass the edit function
                        onDelete={handleDeleteExample} // Pass the delete function
                    />


                    {/* Display pagination if there are items and no error */}
                    {!error && currentItems?.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}


                    {/* Render the ExampleModal component */}
                    <ExampleModal
                        show={showModal}
                        onHide={handleCloseModal}
                        action={modalAction}
                        exampleData={exampleData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmitForm}
                        isLoading={isLoading} // Pass loading state to disable form during submission if needed
                    />
                </>
            )}

        </div>
    );
};

export default ExamplesPage;
