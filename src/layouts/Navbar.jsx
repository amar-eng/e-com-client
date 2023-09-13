import { Navbar, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCartItems } from '../hooks/useCartItems';
import { user, shoppingBag } from '../utils/lists';

export const AppNavbar = () => {
  const cartItems = useCartItems();
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
