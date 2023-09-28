import { Col, Row } from 'react-bootstrap';
import { Buttons } from '../components/Buttons';
import { LinkContainer } from 'react-router-bootstrap';

export const Hero = () => {
  return (
    <Row className="hero">
      {/* Text and buttons exist here */}
      <Col xs={8} className="hero__content">
        <div className="hero__header">
          2 Designer Scents, 1 discovery Every month!
          <p className="hero__header-paragraph">
            Get two luxury fragrances monthly: A scent of your choice & A
            complimentary surprise.
          </p>
          <p className="hero__header-paragraph">
            First month for just <span>$24.99</span> $12.49.
          </p>
          <p className="hero__header-paragraph">Fragrance is forever</p>
        </div>

        <Row className="hero__buttons">
          <LinkContainer to="/explore-scents">
            <Col>
              <Buttons text="Try A Subscription " />
            </Col>
          </LinkContainer>
        </Row>
      </Col>

      {/* Col with a background image exists here */}
      <Col xs={4} className="hero__image"></Col>
    </Row>
  );
};
