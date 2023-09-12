import { Col, Row } from 'react-bootstrap';
import { Buttons } from '../components/Buttons';
import { LinkContainer } from 'react-router-bootstrap';

export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__header">
        Discover your
        <span className="hero__header-span"> perfect scent</span>
        <p className="hero__header-paragraph">
          luxury fragrances at affordable prices
        </p>
      </div>

      <Row className="hero__buttons">
        <LinkContainer to="/explore-scents">
          <Col>
            <Buttons text="Explore Scents" />
          </Col>
        </LinkContainer>

        <Col>
          <Buttons text="Subscribe Now" />
        </Col>
      </Row>
    </div>
  );
};
