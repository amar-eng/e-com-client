import React from 'react';
import { Cart } from '../pages/Cart';
import { Modal } from 'react-bootstrap';
import { useCartItems } from '../hooks/useCartInfo';

export const CartModal = ({ showModal, handleCloseModal }) => {
  const cartItems = useCartItems();
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      centered
      size="lg"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title className="cart__header-modal">
          Your Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Cart handleCloseModal={handleCloseModal} />
      </Modal.Body>
    </Modal>
  );
};
