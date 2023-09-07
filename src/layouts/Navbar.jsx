import { useState } from 'react';
import { Navbar, Nav, Col, Row } from 'react-bootstrap';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';

export const AppNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="navbar-container">
      <Navbar expand="lg" expanded={expanded} className="custom-navbar">
        <Row className="navbar-row">
          <Col xs="auto" className="navbar-item">
            <MenuIcon
              onClick={() => setExpanded(!expanded)}
              style={{ cursor: 'pointer' }}
            />
          </Col>
          <Col xs="auto" className="navbar-item mx-auto">
            <div className="navbar-logo">aroma</div>
          </Col>
          <Col xs="auto" className="navbar-item">
            <ShoppingCartOutlinedIcon style={{ cursor: 'pointer' }} />
          </Col>
        </Row>
        {expanded && (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link className="responsive-navbar__links" href="home">
                Home
              </Nav.Link>
              <Nav.Link className="responsive-navbar__links" href="explore">
                Explore Scents
              </Nav.Link>
              <Nav.Link className="responsive-navbar__links" href="pricing">
                Pricing Plans
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Navbar>
      <div className={`navbar-underline ${expanded ? 'expanded' : ''}`} />
    </div>
  );
};
