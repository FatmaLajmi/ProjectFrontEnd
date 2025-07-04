import { Table, Button } from 'react-bootstrap';
import { EditIcon, DeleteIcon } from '../../../../assets/icons/Icons.jsx';

const OrderTable = ({ orders, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>User</th>
          <th># Products</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders && orders.length > 0 ? (
          orders.map(order => (
            <tr key={order._id}>
              <td>{order.user?.name || 'N/A'}</td>
              <td>{order.products?.length || 0}</td>
              <td>{order.totalPrice}</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => onEdit('update', order)}
                  className="me-2"
                >
                  <EditIcon />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onDelete(order._id)}
                >
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">No orders found.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default OrderTable;
