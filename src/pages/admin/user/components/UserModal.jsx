import { Modal, Button, Form, ButtonGroup } from "react-bootstrap";

const UserModal = ({
  show,
  onHide,
  action,
  userData,
  onInputChange,
  onSubmit,
  isLoading,
}) => {
  const modalTitle = action === "create" ? "Create User" : "Update User's Role";
  const submitButtonText = action === "create" ? "Create" : "Update";

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Form.Group controlId="formUserName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={userData.name || ""}
              onChange={onInputChange}
              required
              disabled={isLoading || action === "update"}
            />
          </Form.Group>

          <Form.Group controlId="formUserEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={userData.email || ""}
              onChange={onInputChange}
              required
              disabled={isLoading || action === "update"}
            />
          </Form.Group>

          {action === "create" && (
            <Form.Group controlId="formUserPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={userData.password || ""}
                onChange={onInputChange}
                required
                disabled={isLoading || action === "update"}
              />
            </Form.Group>
          )}

          <Form.Group controlId="formUserImage" className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="url"
              name="image"
              placeholder="Enter image URL"
              value={userData.image || ""}
              onChange={onInputChange}
              disabled={isLoading || action === "update"}
            />
          </Form.Group>

          <Form.Group controlId="formUserIsAdmin" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="isAdmin"
              value={userData.isAdmin ? 'admin' : 'client'}
              onChange={(e) =>
                onInputChange({
                  target: {
                    name: 'isAdmin',
                    value: e.target.value === 'admin',
                  },
                })
              }
              disabled={isLoading}
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>


          <ButtonGroup className="my-2 d-flex justify-content-end">
            <Button
              className="me-2"
              variant="danger"
              onClick={onHide}
              disabled={isLoading}
            >
              Cancel
            </Button>
            
            <Button
              className="me-2"
              variant="primary"
              type="submit"
              disabled={isLoading}
            >
              {submitButtonText}
            </Button>
          </ButtonGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
