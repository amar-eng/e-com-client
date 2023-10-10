import React from 'react';

export const ImageGallery = ({ images }) => {
  return (
    <div className="gallery-container">
      <div className="gallery">
        <div className="gallery__item gallery__item--1">
          <img className="gallery__img" src={images[0]} alt="gallery1" />
        </div>
        <div className="gallery__item gallery__item--2">
          <img className="gallery__img" src={images[1]} alt="gallery2" />
        </div>
        <div className="gallery__item gallery__item--3">
          <img className="gallery__img" src={images[2]} alt="gallery3" />
        </div>
      </div>
    </div>
  );
};
