import { useState, useEffect } from 'react';
import { Navbar, Col, Row } from 'react-bootstrap';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { paths } from '../utils/paths';
import { useLocation } from 'react-router-dom';

export const AppNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const getCartPath = () => {
    const cartItem = paths.find((pathItem) => pathItem.label === 'Cart');
    return cartItem ? cartItem.path : '/';
  };
  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  return (
    <div className="navbar-container">
      <Navbar expand="lg" expanded={expanded} className="custom-navbar">
        <Row className="navbar-row">
          <Col className="navbar-item mx-auto">
            <div className="navbar-logo">aroma</div>
          </Col>

          <Col xs="auto" className="navbar-item">
            <div
              onClick={() => (window.location.href = getCartPath())}
              className="cart-link"
            >
              <ShoppingBagOutlinedIcon
                style={{ cursor: 'pointer', fill: '#d9ac68' }}
              />
            </div>
          </Col>
        </Row>
      </Navbar>
      <div className={`navbar-underline ${expanded ? 'expanded' : ''}`} />
    </div>
  );
};
