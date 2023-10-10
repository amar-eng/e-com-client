import { useState, useEffect } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { FormContainer } from '../components/FormContainer';
import { CheckoutSteps } from '../layouts/CheckoutSteps';
import { savePaymentMethod } from '../services/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useShippingAddress } from '../hooks/useCartInfo';

export const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingAddress = useShippingAddress();

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/place-order');
  };

  return (
    <FormContainer>
      {/* <CheckoutSteps step1 step2 step3 /> */}
      <h3>Payment Method</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="Paypal"
              id="PayPal"
              name="paymentMehtod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              className="my-2"
              label="Credit Card"
              id="CreditCard"
              name="paymentMehtod"
              value="creditCard"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        {/* <Button type="submit" variant="warning">
          Continue
        </Button> */}
      </Form>
    </FormContainer>
  );
};
