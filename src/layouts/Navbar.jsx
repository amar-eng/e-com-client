import { Navbar, Col, Row } from 'react-bootstrap';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
// import { paths } from '../utils/paths';
import { LinkContainer } from 'react-router-bootstrap';

export const AppNavbar = () => {
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
              <ShoppingBagOutlinedIcon
                style={{ cursor: 'pointer', fill: '#d9ac68' }}
              />
            </Col>
          </LinkContainer>
        </Row>
      </Navbar>
      <div className={`navbar-underline`} />
    </div>
  );
};
