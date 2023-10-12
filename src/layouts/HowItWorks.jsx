import { Col, Row } from 'react-bootstrap';
import { SectionHeader } from '../components/SectionHeaders';
import { stepsData } from '../utils/stepsData';

export const HowItWorks = () => {
  return (
    <div className="how-it-works-section">
      <SectionHeader text="How It All Works" />

      <Row className="works-row">
        {stepsData.map((step) => (
          <Col xs={12} md={8} lg={4} key={step.number} className="step-col">
            <div className="step-number">{step.number}</div>
            <img
              src={step.imageUrl}
              alt={`Step ${step.number}`}
              className="step__img"
            />
            <h3 className="step-col__header">{step.title}</h3>
            <p className="step-col__p">{step.description}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
};
