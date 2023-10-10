import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

export const GoBack = ({ to }) => {
  return (
    <LinkContainer to={to}>
      <div className="go-back-btn">Go Back</div>
    </LinkContainer>
  );
};
