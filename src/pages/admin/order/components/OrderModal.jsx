import { Modal, Button, Form, ButtonGroup } from 'react-bootstrap';

const OrderModal = ({
  show,
  onHide,
  action,
  orderData,
  onInputChange,
  onProductChange,
  addProduct,
  removeProduct,
  onSubmit,
  isLoading,
  validStatuses,
}) => {
  const modalTitle = action === 'create' ? 'Create Order' : 'Update Order';
  const submitButtonText = action === 'create' ? 'Create' : 'Update';

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
        >
          
          {(orderData.products|| []).map((item, index) => (
            <div key={index} className="mb-3 d-flex gap-2 align-items-center">
              
              <Form.Label>Product</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product ID"
                name={`products[${index}].product.name`}
                value={item.product?.name}
                onChange={e => onProductChange(e, index)}
                required
                disabled={isLoading || action === 'update'}
              />
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min={1}
                placeholder="Quantity"
                name={`products[${index}].quantity`}
                value={item.quantity}
                onChange={e => onProductChange(e, index)}
                required
                disabled={isLoading || action === 'update'}
              />
              {/* <Button
                variant="danger"
                onClick={() => removeProduct(index)}
                disabled={isLoading}
              >
                Remove
              </Button> */}
            </div>
          ))}

          {/* <Button variant="secondary" onClick={addProduct} disabled={isLoading}>
            Add Product
          </Button> */}

          <Form.Group controlId="totalPrice" className="mt-3">
            <Form.Label>Total Price</Form.Label>
            <Form.Control
              type="number"
              min={0}
              name="totalPrice"
              value={orderData.totalPrice}
              onChange={onInputChange}
              required
              disabled={isLoading || action === 'update'}
            />
          </Form.Group>

          <Form.Group controlId="status" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={orderData.status}
              onChange={onInputChange}
              required
              disabled={isLoading}
            >
              {validStatuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <ButtonGroup className="my-3 d-flex justify-content-end">
            <Button variant="danger" onClick={onHide} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {submitButtonText}
            </Button>
          </ButtonGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderModal;
