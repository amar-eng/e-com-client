import React from 'react';
import { Col, Row } from 'react-bootstrap';

const colors = [null, '#8B0000', '#FF8C00', '#FFD700', '#9ACD32', '#006400'];

export const Longevity = ({ text, value }) => {
  const fillPercentage = (value / 5) * 100;

  return (
    <div className="longevity">
      <Col md={2} className="longevity__p">
        {text}
      </Col>
      <Col md={3} className="longevity__container">
        <div
          className="longevity__fill"
          style={{
            width: `${fillPercentage}%`,
            backgroundColor: colors[value],
          }}
        ></div>
      </Col>
    </div>
  );
};
