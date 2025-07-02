import { useEffect } from 'react';
import { Button, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import useUsers from '../../../hooks/useUser.js';
import usePagination from '../../../hooks/usePagination.js';
import { CreateIcon } from '../../../assets/icons/Icons.jsx'; 
import Loader from '../../../components/loader/Loader.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';
import UserModal from './components/UserModal.jsx';
import UserTable from './components/UserTable.jsx';

const UsersPage = () => {

const {
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
} = useUsers();

    const { currentPage, currentItems, totalPages, handlePageChange } =
        usePagination(users, 10);

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="container mt-4">
            {error && <Alert variant="danger">{error}</Alert>}

            <div className='d-flex justify-content-between'>
                <h1>Users List</h1>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="create-tooltip">  Create a new User </Tooltip>}
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

            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <UserTable
                        users={currentItems}
                        onEdit={handleShowModal}
                        onDelete={handleDeleteUser}
                    />

                    {!error && currentItems?.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}

                    <UserModal
                        show={showModal}
                        onHide={handleCloseModal}
                        action={modalAction}
                        userData={userData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmitForm}
                        isLoading={isLoading} 
                    />
                </>
            )}

        </div>
    );
};

export default UsersPage;
