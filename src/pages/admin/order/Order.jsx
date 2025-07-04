import { useEffect } from 'react';
import { Button, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import useOrders from '../../../hooks/useOrder.js';
import usePagination from '../../../hooks/usePagination.js';
import Loader from '../../../components/loader/Loader.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';
import OrderModal from './components/OrderModal.jsx';
import OrderTable from './components/OrderTable.jsx';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {

  const {
    orders,
    orderData,
    isLoading,
    error,
    showModal,
    modalAction,
    getAllOrders,
    handleSubmitForm,
    handleShowModal,
    handleCloseModal,
    handleDeleteOrder,
    handleInputChange,
    handleRemoveProduct
  } = useOrders();

  const { currentPage, currentItems, totalPages, handlePageChange } =
  usePagination(orders, 10);

  useEffect(() => {
    getAllOrders();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="container mt-4">
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between">
        <h1>Orders List</h1>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="create-tooltip">Create a new Order</Tooltip>}
        >
          <Button
            variant="primary"
            onClick={() => navigate('/')}
            disabled={isLoading}
          >
            Create order
          </Button>
        </OverlayTrigger>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <OrderTable
            orders={currentItems}
            onEdit={handleShowModal}
            onDelete={handleDeleteOrder}
          />

          {!error && currentItems?.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <OrderModal
            show={showModal}
            onHide={handleCloseModal}
            action={modalAction}
            orderData={orderData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmitForm}
            removeProduct={handleRemoveProduct}
            isLoading={isLoading}
            validStatuses={['pending', 'shipped', 'delivered', 'canceled']}
          />
        </>
      )}
    </div>
  );
};

export default OrdersPage;
