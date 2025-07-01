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
                            name="name" // Important for handling input changes
                            placeholder="Enter product name"
                            value={productData.name || ''} // Ensure value is a string, even if null/undefined
                            onChange={onInputChange}
                            required
                            disabled={isLoading}
                        />
                    </Form.Group>

                    {/* Product Description */}
                    <Form.Group controlId="formProductDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description" // Important for handling input changes
                            placeholder="Enter product description"
                            value={productData.description || ''} // Ensure value is a string
                            onChange={onInputChange}
                            disabled={isLoading}
                        />
                    </Form.Group>

                    {/* Product Price */}
                    <Form.Group controlId="formProductPrice" className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number" // Changed to number type
                            name="price"
                            placeholder="Enter price"
                            value={productData.price || ''} // Ensure value is a string for input, handle conversion in parent
                            onChange={onInputChange}
                            required
                            min="0"
                            step="0.01" // Allows for decimal values
                            disabled={isLoading}
                        />
                    </Form.Group>

                    {/* Product Image URL */}
                    <Form.Group controlId="formProductImage" className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="url" // Changed to URL type for image
                            name="image"
                            placeholder="Enter image URL"
                            value={productData.image || ''} // Ensure value is a string
                            onChange={onInputChange}
                            disabled={isLoading}
                        />
                    </Form.Group>

                    {/* Product Category */}
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

                    {/* Product Stock */}
                    <Form.Group controlId="formProductStock" className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number" // Changed to number type
                            name="stock"
                            placeholder="Enter stock quantity"
                            value={productData.stock || ''} // Ensure value is a string
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