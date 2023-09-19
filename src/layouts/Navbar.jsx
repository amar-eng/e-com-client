import { Navbar, Col, Row, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCartItems } from '../hooks/useCartInfo';
import { user, shoppingBag } from '../utils/lists';
import { useUserInfo } from '../hooks/useUserInfo';
import { useLogoutMutation } from '../services/slices/usersApiSlice';
import { logout } from '../services/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export const AppNavbar = () => {
  const cartItems = useCartItems();
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error?.data?.message || error.data);
    }
  };

  return (
    <div className="navbar-container">
      <Navbar className="custom-navbar">
        <Row className="navbar-row">
          <LinkContainer to="/">
            <Col className="navbar-item mx-auto">
              <div className="navbar-logo">aroma</div>
            </Col>
          </LinkContainer>

          <LinkContainer to="/login">
            <Col xs="auto" className="navbar-item">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* User icon */}
                <img
                  src={user}
                  style={{
                    width: '25px',
                    margin: '0 0.5rem',
                  }}
                />
                {userInfo && (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
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

          <LinkContainer to="/cart">
            <Col xs="auto" className="navbar-item">
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
          </LinkContainer>
        </Row>
      </Navbar>
      <div className={`navbar-underline`} />
    </div>
  );
};
