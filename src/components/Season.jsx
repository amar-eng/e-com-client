import React from 'react';
import { Col } from 'react-bootstrap';
import { summer, spring, winter, fall } from '../utils/lists';

export const Season = ({ season }) => {
  return (
    <Col className="gender" md={2}>
      <img
        src={
          season === 'summer'
            ? summer
            : season === 'spring'
            ? spring
            : season === 'fall'
            ? fall
            : winter
        }
        className="gender__icon"
      />
    </Col>
  );
};
