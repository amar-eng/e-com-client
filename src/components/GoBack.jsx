import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const GoBack = ({ to }) => {
  return (
    <LinkContainer to={to}>
      <div className="go-back-btn">Go Back</div>
    </LinkContainer>
  );
};
