import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FormContainer } from '../components/FormContainer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../services/slices/cartSlice';
import { CheckoutSteps } from '../layouts/CheckoutSteps';
import { useCartItems, useShippingAddress } from '../hooks/useCartInfo';
import { GoBack } from '../components/GoBack';
import { Payment } from './Payment';
import { PlaceOrder } from './PlaceOrder';

export const Shipping = () => {
  const shippingAddress = useShippingAddress();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [state, setState] = useState(shippingAddress?.state || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({ address, city, postalCode, state, country })
    );
    navigate('/payment');
  };

  const cartItems = useCartItems();
  const lastProductId = cartItems[cartItems.length - 1]?.product?._id;

  return (
    <FormContainer>
      <GoBack
        to={
          lastProductId ? `/explore-scents/${lastProductId}` : `/explore-scents`
        }
      />

      <h3>Shipping Details</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Control
            type="text"
            placeholder="Enter postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="state" className="my-2">
          <Form.Control
            type="text"
            placeholder="Enter state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="my-2">
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Payment />
        <PlaceOrder />
        <Button type="submit" variant="warning" className="my-2 px-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
