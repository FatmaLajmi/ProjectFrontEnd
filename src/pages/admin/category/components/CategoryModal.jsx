import { Modal, Button, Form, ButtonGroup } from 'react-bootstrap';

const CategoryModal = ({ show, onHide, action, categoryData, onInputChange, onSubmit, isLoading }) => {
    const modalTitle = action === 'create' ? 'Create Category' : 'Update Category';
    const submitButtonText = action === 'create' ? 'Create' : 'Update';

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <Form.Group controlId="formCategoryName" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter category name"
                            value={categoryData.name}
                            onChange={onInputChange}
                            required
                            disabled={isLoading}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCategoryDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            placeholder="Enter category description"
                            value={categoryData.description}
                            onChange={onInputChange}
                            required
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

export default CategoryModal;
