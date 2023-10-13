import { Col, Row } from 'react-bootstrap';
import { Buttons } from '../components/Buttons';
import { LinkContainer } from 'react-router-bootstrap';

export const Hero = () => {
  return (
    <Row className="hero">
      <Col xs={8} className="hero__content">
        <div className="hero__header">
          2 Designer Scents, 1 discovery Every Time!
          <p className="hero__header-paragraph">
            Get two luxury fragrances: A scent of your choice & A complimentary
            surprise.
          </p>
          <p className="hero__header-paragraph">
            For the month of October <span>$24.99</span> $12.49.
          </p>
          <p className="hero__header-paragraph">Fragrance is forever</p>
        </div>

        <Row className="hero__buttons">
          <LinkContainer to="/explore-scents">
            <Col>
              <Buttons text="Explore Scents " />
            </Col>
          </LinkContainer>
        </Row>
      </Col>

      <Col xs={4} className="hero__image"></Col>
    </Row>
  );
};
