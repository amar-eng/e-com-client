import React from 'react';
import { Col } from 'react-bootstrap';
import { man, woman, unisex } from '../utils/lists';

export const Gender = ({ gender, width }) => {
  return (
    <Col className="gender" xs={1} md={2}>
      <img
        src={gender === 'male' ? man : gender === 'female' ? woman : unisex}
        alt="gender"
        style={{ width: `${width}` }}
      />
    </Col>
  );
};
