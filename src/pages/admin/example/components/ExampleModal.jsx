import { Modal, Button, Form, ButtonGroup } from 'react-bootstrap';

const ExampleModal = ({ show, onHide, action, exampleData, onInputChange, onSubmit, isLoading }) => {
    const modalTitle = action === 'create' ? 'Create Example' : 'Update Example';
    const submitButtonText = action === 'create' ? 'Create' : 'Update';

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <Form.Group controlId="formExampleName" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name" // Important for handling input changes
                            placeholder="Enter name"
                            value={exampleData.name}
                            onChange={onInputChange}
                            required
                            disabled={isLoading}
                        />
                    </Form.Group>

                    <Form.Group controlId="formExampleDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description" // Important for handling input changes
                            placeholder="Enter description"
                            value={exampleData.description}
                            onChange={onInputChange}
                            required
                            disabled={isLoading}
                        />
                    </Form.Group>

                    <ButtonGroup className="my-2 d-flex justify-content-end">
                        <Button  className="me-2" variant="danger" onClick={onHide} disabled={isLoading}>
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

export default ExampleModal;