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
        <Row className="navbar-row ">
          <Col className="navbar-item" xs={4} sm={7} md={7} lg={8} xl={9}>
            <LinkContainer to="/">
              <div className="navbar-logo">AERU</div>
            </LinkContainer>
          </Col>
          <Col
            xs={1}
            sm={1}
            md={1}
            lg={1}
            xl={1}
            className="navbar-item"
            onClick={openCartModal}
          >
            {cartItems.length > 0 && (
              <div className="navbar-item-container">
                <p className="nav-number">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </p>
              </div>
            )}
          </Col>
          <Col xs={7} sm={4} md={4} lg={3} xl={2} className="navbar-item">
            <LinkContainer to="/login">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {!userInfo && (
                  <img
                    src={user}
                    style={{
                      width: '25px',
                    }}
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
                    </NavDropdown>

                    {userInfo.isAdmin && (
                      <NavDropdown
                        title="Admin"
                        id="adminMenu"
                        className="nav-dropdown-name nav-dropdown-admin"
                      >
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
                      </NavDropdown>
                    )}
                  </div>
                )}
              </div>
            </LinkContainer>
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
