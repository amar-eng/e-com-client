import { Navbar, Col, Row, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCartItems } from '../hooks/useCartInfo';
import { user } from '../utils/lists';
import { useUserInfo } from '../hooks/useUserInfo';
import { useLogoutMutation } from '../services/slices/usersApiSlice';
import { logout } from '../services/slices/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { notifySuccess } from '../components/notifications';
import { CartModal } from './CartModal';
import { useState } from 'react';
import { AuthModal } from './AuthModal';

export const AppNavbar = () => {
  const [showCartModal, setShowCartModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('login');

  const openCartModal = () => {
    setShowCartModal(true);
  };

  const closeCartModal = () => {
    setShowCartModal(false);
  };

  const openAuthModal = () => {
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
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
        <Row className="navbar-row ">
          <Col className="navbar-item" xs={4} sm={7} md={7} lg={8} xl={10}>
            <LinkContainer to="/">
              <div className="navbar-logo">AERU</div>
            </LinkContainer>
          </Col>
          <Col>
            <Row className="align-items-center">
              <Col className="navbar-item d-flex justify-content-end">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {!userInfo && (
                    <img
                      src={user}
                      style={{
                        width: '25px',
                        cursor: 'pointer',
                      }}
                      onClick={openAuthModal}
                      alt="scent scent-user perfume"
                    />
                  )}
                  {userInfo && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <NavDropdown
                        title={`Hi, ${userInfo.name}`}
                        id="username"
                        className="nav-dropdown-name"
                      >
                        <LinkContainer to="/my-account">
                          <NavDropdown.Item className="nav-dropdown-name__item">
                            Profile
                          </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item
                          onClick={logoutHandler}
                          className="nav-dropdown-name__item"
                        >
                          Logout
                        </NavDropdown.Item>

                        {userInfo.isAdmin && (
                          <>
                            <NavDropdown.Divider />

                            <LinkContainer to="/admin/productlist">
                              <NavDropdown.Item className="nav-dropdown-name__item">
                                Products
                              </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/orderlist">
                              <NavDropdown.Item className="nav-dropdown-name__item">
                                Orders
                              </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/userlist">
                              <NavDropdown.Item className="nav-dropdown-name__item">
                                Users
                              </NavDropdown.Item>
                            </LinkContainer>
                          </>
                        )}
                      </NavDropdown>
                    </div>
                  )}
                </div>

                <AuthModal
                  show={showAuthModal}
                  handleClose={closeAuthModal}
                  authType={authType}
                  setAuthType={setAuthType}
                />
              </Col>
              <Col
                className="navbar-item d-flex justify-content-end"
                onClick={openCartModal}
                xl={3}
              >
                {cartItems.length >= 0 && (
                  <div className="navbar-item-container">
                    <p className="nav-number">
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </p>
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Navbar>
      <div className="navbar-underline-container">
        <div className={`navbar-underline`} />
      </div>

      <CartModal showModal={showCartModal} handleCloseModal={closeCartModal} />
    </div>
  );
};
