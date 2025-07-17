import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Alert, Button, OverlayTrigger, Tooltip, Badge, Modal} from 'react-bootstrap';
import { LogoutIcon, ProfileIcon, ShopIcon} from "../../assets/icons/Icons.jsx";
import { truncateText } from '../../assets/utils/helpers.js';
import useAuth from '../../hooks/useAuth';

const Menu = () => {
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Safely get cart data with default empty items array
  const cart = useSelector((state) => state.cart || { items: [] });
  const cartItemsCount = cart.items.length; // Using length like in your initial code

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">E-commerce</Navbar.Brand>

          <Nav>
            {user ? (
              user.isAdmin ? (
                <>
                  <Nav.Link onClick={() => navigate('/admin/examples')}>Examples</Nav.Link>
                  <Nav.Link onClick={() => navigate('/admin/categories')}>Categories</Nav.Link>
                  <Nav.Link onClick={() => navigate('/admin/products')}>Products</Nav.Link>
                  <Nav.Link onClick={() => navigate('/admin/users')}>Users</Nav.Link>
                  <Nav.Link onClick={() => navigate('/admin/orders')}>Orders</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => navigate('/examples')}>Examples</Nav.Link>
                  <Nav.Link onClick={() => navigate('/categories')}>Categories</Nav.Link>
                  <Nav.Link onClick={() => navigate('/products')}>Products</Nav.Link>
                  <Nav.Link onClick={() => navigate('/users')}>Users</Nav.Link>
                  <Nav.Link onClick={() => navigate('/orders')}>Orders</Nav.Link>
                </>
              )
            ) : null}
          </Nav>

          <Nav>
            {user ? (
              <>
                <Nav.Link onClick={() => navigate('/profile')} className="d-flex align-items-center">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>{user?.name}</Tooltip>}
                  >
                    <div>
                      <span className="text-white me-2">
                        {truncateText(user?.name, 5)}
                      </span>
                      <ProfileIcon />
                    </div>
                  </OverlayTrigger>
                </Nav.Link>
                
                {!user.isAdmin && (
                  <Nav.Link onClick={() => navigate('/shop')} className="d-flex align-items-center">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>Shop</Tooltip>}
                    >
                      <div>
                        <ShopIcon />
                        <Badge bg="success">{cartItemsCount}</Badge>
                      </div>
                    </OverlayTrigger>
                  </Nav.Link>
                )}

                <Nav.Link onClick={handleShow}>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Logout</Tooltip>}
                  >
                    <Button
                      variant="outline-light"
                      style={{ width: '35px', height: '40px' }}
                    >
                      <LogoutIcon />
                    </Button>
                  </OverlayTrigger>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => navigate('/login')}>
                  <Button variant="outline-light">Login</Button>
                </Nav.Link>
                <Nav.Link onClick={() => navigate('/signup')}>
                  <Button variant="primary">Sign Up</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      {error && <Alert variant="danger">{error}</Alert>}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to log out?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Menu;