import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { base, heart, top } from '../utils/lists';

export const Notes = ({ topNotes, middleNotes, baseNotes }) => {
  return (
    <Row className="notes">
      <Col>
        <h4 className="notes__header">Top Notes</h4>
        <Col>
          {topNotes.map((note, index) => {
            return (
              <div key={index} className="notes__group">
                <img src={top} className="notes__icon" />
                <p className="notes__p">{note}</p>
              </div>
            );
          })}
        </Col>
      </Col>
      <Col>
        <h4 className="notes__header">Heart Notes</h4>
        <Col>
          {middleNotes.map((note, index) => {
            return (
              <div key={index} className="notes__group">
                <img src={heart} className="notes__icon" />
                <p className="notes__p">{note}</p>
              </div>
            );
          })}
        </Col>
      </Col>
      <Col>
        <h4 className="notes__header">Base Notes</h4>
        <Col>
          {baseNotes.map((note, index) => {
            return (
              <div key={index} className="notes__group">
                <img src={base} className="notes__icon" />
                <p className="notes__p">{note}</p>
              </div>
            );
          })}
        </Col>
      </Col>
    </Row>
  );
};
