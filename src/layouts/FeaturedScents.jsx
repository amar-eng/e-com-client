import { Col, Row } from 'react-bootstrap';
import { BasicCard } from '../components/BasicCard';

export const FeaturedScents = () => {
  return (
    <>
      <div className="featured">Featured Scents</div>
      <Row className="featured__row" xs={2}>
        <Col>
          <BasicCard
            scentName="Blue De Chanel"
            subheader="Scent of the ocean"
          />
        </Col>
        <Col>
          <BasicCard
            scentName="Blue De Chanel"
            subheader="Scent of the ocean"
          />
        </Col>
      </Row>
    </>
  );
};
