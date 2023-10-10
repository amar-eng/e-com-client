import { Navbar, Col, Row, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCartItems } from '../hooks/useCartInfo';
import { user, shoppingBag } from '../utils/lists';
import { useUserInfo } from '../hooks/useUserInfo';
import { useLogoutMutation } from '../services/slices/usersApiSlice';
import { logout } from '../services/slices/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { notifySuccess } from '../components/notifications';
import { CartModal } from './CartModal';
import { useState } from 'react';

export const AppNavbar = () => {
  const [showCartModal, setShowCartModal] = useState(false);

  const openCartModal = () => {
    setShowCartModal(true);
  };

  const closeCartModal = () => {
    setShowCartModal(false);
  };

  const cartItems = useCartItems();
  const userInfo = useUserInfo();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      notifySuccess('Logged out successfully');
    } catch (error) {
      toast.error(error?.data?.message || error.data);
    }
  };

  return (
    <div className="navbar-container">
      <Navbar className="custom-navbar">
        <Row className="navbar-row">
          <LinkContainer to="/">
            <Col className="navbar-item" md={9}>
              <div className="navbar-logo">El-Misk</div>
            </Col>
          </LinkContainer>

          <LinkContainer to="/login">
            <Col xs="auto" className="navbar-item">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={user}
                  style={{
                    width: '25px',
                    margin: '0 0.5rem',
                  }}
                />
                {userInfo && (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/my-account">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminMenu">
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </div>
            </Col>
          </LinkContainer>

          <Col xs="auto" className="navbar-item" onClick={openCartModal}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={shoppingBag}
                style={{
                  width: '25px',
                }}
              />

              {cartItems.length > 0 && (
                <div className="cart-item-count">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Navbar>
      <div className={`navbar-underline`} />
      <CartModal showModal={showCartModal} handleCloseModal={closeCartModal} />
    </div>
  );
};
