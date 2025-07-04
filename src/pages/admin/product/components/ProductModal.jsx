import { Modal, Button, Form, ButtonGroup } from 'react-bootstrap';

const ProductModal = ({ show, onHide, action, productData, onInputChange, onSubmit, isLoading, categories }) => {
    const modalTitle = action === 'create' ? 'Create Product' : 'Update Product';
    const submitButtonText = action === 'create' ? 'Create' : 'Update';

    console.log(categories);
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <Form.Group controlId="formProductName" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter product name"
                            value={productData.name || ''}
                            onChange={onInputChange}
                            required
                            disabled={isLoading}
                        />
                    </Form.Group>

                    <Form.Group controlId="formProductDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description" 
                            placeholder="Enter product description"
                            value={productData.description || ''} 
                            onChange={onInputChange}
                            disabled={isLoading}
                        />
                    </Form.Group>

                    <Form.Group controlId="formProductPrice" className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number" 
                            name="price"
                            placeholder="Enter price"
                            value={productData.price || ''} 
                            onChange={onInputChange}
                            required
                            min="0"
                            step="0.01" 
                            disabled={isLoading}
                        />
                    </Form.Group>

                    <Form.Group controlId="formProductImage" className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="url" 
                            name="image"
                            placeholder="Enter image URL"
                            value={productData.image || ''} 
                            onChange={onInputChange}
                            disabled={isLoading}
                        />
                    </Form.Group>

                    <Form.Group controlId="formProductCategory" className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={productData.category || ''}
                            onChange={onInputChange}
                            required
                            disabled={isLoading}
                        >
                            <option value="">Select a category</option>
                            {categories && categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formProductStock" className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number" 
                            name="stock"
                            placeholder="Enter stock quantity"
                            value={productData.stock || ''} 
                            onChange={onInputChange}
                            required
                            min="0"
                            disabled={isLoading}
                        />
                    </Form.Group>

                    <ButtonGroup className="my-2 d-flex justify-content-end">
                        <Button className="me-2" variant="danger" onClick={onHide} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button className="me-2" variant="primary" type="submit" disabled={isLoading}>
                            {submitButtonText}
                        </Button>
                    </ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;