import { Col } from 'react-bootstrap';

export const ProfileHeader = ({ headerText }) => {
  return (
    <Col>
      <h4 className="headerText">{headerText}</h4>
    </Col>
  );
};
