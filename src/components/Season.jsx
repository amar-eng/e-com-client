import React from 'react';
import { Col } from 'react-bootstrap';
import { summer, spring, winter, fall } from '../utils/lists';

export const Season = ({ season, width }) => {
  return (
    <Col className="gender" xs={3} md={2}>
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
        style={{ width: `${width}` }}
        alt="season for fragrence"
      />
    </Col>
  );
};
