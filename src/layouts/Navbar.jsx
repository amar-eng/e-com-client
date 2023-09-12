import { Navbar, Col, Row, Badge } from 'react-bootstrap';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { LinkContainer } from 'react-router-bootstrap';
import { useCartItems } from '../hooks/useCartItems';

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

          <LinkContainer to="/cart">
            <Col xs="auto" className="navbar-item">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ShoppingBagOutlinedIcon
                  style={{ cursor: 'pointer', fill: '#d9ac68' }}
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
