import React from 'react';
import { Col } from 'react-bootstrap';
import { man, woman, unisex } from '../utils/lists';

export const Gender = ({ gender }) => {
  return (
    <Col className="gender" md={2}>
      <img
        src={gender === 'male' ? man : gender === 'female' ? woman : unisex}
        className="gender__icon"
      />
    </Col>
  );
};
