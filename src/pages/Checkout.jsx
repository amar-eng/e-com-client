import React from 'react';
import { Col, ListGroup, Row, Image, Button, Form } from 'react-bootstrap';
import { useCart, useCartItems } from '../hooks/useCartInfo';
import { Link } from 'react-router-dom';
import { GoBack } from '../components/GoBack';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const Checkout = () => {
  const cartItems = useCartItems();
  const lastProductId = cartItems[cartItems.length - 1]?.product?._id;
  const { totalPrice, shippingPrice, itemsPrice, taxPrice } = useCart();

  const validationSchema = Yup.object().shape({
    billingName: Yup.string().required('Please enter a valid name'),
    billingEmail: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    billingPhone: Yup.string().required('Phone number is required'),
    shippingAddress: Yup.string().required('Address is required'),
    shippingZipCode: Yup.string().required('Zip Code is required'),
    shippingCity: Yup.string().required('City is required'),
    shippingCountry: Yup.string().required('Country is required'),
    paymentMethod: Yup.string().required('Payment method is required'),
  });

  const formik = useFormik({
    initialValues: {
      billingName: '',
      billingEmail: '',
      billingPhone: '',
      shippingAddress: '',
      shippingZipCode: '',
      shippingCity: '',
      shippingCountry: '',
      paymentMethod: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission
    },
  });

  const renderInput = (name, placeholder, type = 'text') => (
    <>
      <Form.Control
        type={type}
        placeholder={placeholder}
        className={`checkout__input ${
          formik.touched[name] && formik.errors[name] ? 'is-invalid' : ''
        }`}
        {...formik.getFieldProps(name)}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-danger">{formik.errors[name]}</div>
      )}
    </>
  );
  return (
    <>
      <GoBack
        to={
          lastProductId ? `/explore-scents/${lastProductId}` : `/explore-scents`
        }
      />
      <Row className="checkout">
        <Col md={7} className="checkout__col ">
          <div>
            <h1>Checkout</h1>
            <Form onSubmit={formik.handleSubmit}>
              {/* Billing Details */}
              <h4 className="checkout__header">Billing Details</h4>
              <Row>
                <Col>
                  <Form.Group controlId="billingName">
                    <Form.Label className="checkout__label">Name</Form.Label>
                    {renderInput('billingName', 'John Smith')}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="billingEmail">
                    <Form.Label className="checkout__label">
                      Email Address
                    </Form.Label>
                    {renderInput(
                      'billingEmail',
                      'example@example.com',
                      'email'
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="billingPhone">
                    <Form.Label className="checkout__label">
                      Phone Number
                    </Form.Label>
                    {renderInput('billingPhone', '123-456-7890', 'tel')}
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>

              {/* Shipping Info */}
              <h4 className="checkout__header">Shipping Info</h4>
              <Form.Group controlId="shippingAddress">
                <Form.Label className="checkout__label">Address</Form.Label>
                {renderInput('shippingAddress', '123 Main St')}
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="shippingZipCode">
                    <Form.Label className="checkout__label">
                      Zip Code
                    </Form.Label>
                    {renderInput('shippingZipCode', '12345')}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="shippingCity">
                    <Form.Label className="checkout__label">City</Form.Label>
                    {renderInput('shippingCity', 'CityName')}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="shippingCountry">
                    <Form.Label className="checkout__label">Country</Form.Label>
                    {renderInput('shippingCountry', 'CountryName')}
                  </Form.Group>
                </Col>
              </Row>

              {/* Payment Details */}
              <h4 className="checkout__header">Payment Details</h4>
              <Form.Group controlId="paymentMethod">
                <Form.Label className="checkout__label">
                  Payment Method
                </Form.Label>
                <Row>
                  <Col>
                    <Form.Check
                      type="radio"
                      label="Paypal"
                      name="paymentMethod"
                      value="Paypal"
                      checked={formik.values.paymentMethod === 'Paypal'}
                      onChange={formik.handleChange}
                      className="checkout__input"
                      style={{ cursor: 'pointer' }}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="radio"
                      label="Credit Card"
                      name="paymentMethod"
                      value="Credit Card"
                      className="checkout__input"
                      checked={formik.values.paymentMethod === 'Credit Card'}
                      onChange={formik.handleChange}
                      style={{ cursor: 'pointer' }}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </div>
        </Col>
        <Col md={4} className="checkout__col checkout__col-2">
          <h4 className="checkout__header checkout__header--summary">
            Summary
          </h4>
          {cartItems &&
            cartItems.map((item) => {
              return (
                <ListGroup.Item
                  key={item.product._id}
                  className="checkout__listgroup"
                >
                  <Row className="checkout__rowItem">
                    <Col md={2}>
                      <Link to={`/explore-scents/${item.product._id}`}>
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fluid
                          rounded
                        />
                      </Link>
                    </Col>

                    <Col md={8}>
                      <Row className="cart__name">{item.product.name}</Row>
                      <Row className="cart__price">${item.product.price}</Row>
                    </Col>

                    <Col>x{item.qty}</Col>
                  </Row>
                </ListGroup.Item>
              );
            })}

          <Row className="mt-4">
            <Col md={9}>
              <p className="checkout__price">Price</p>
            </Col>
            <Col>
              <p className="checkout__amount">${itemsPrice}</p>
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <p className="checkout__price">Shipping</p>
            </Col>
            <Col>
              <p className="checkout__amount">${shippingPrice}</p>
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <p className="checkout__price">Tax</p>
            </Col>
            <Col>
              <p className="checkout__amount">${taxPrice}</p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={9}>
              <p className="checkout__price">Grand Total</p>
            </Col>
            <Col>
              <p className="checkout__amount checkout__amount--orange">
                ${totalPrice}
              </p>
            </Col>
          </Row>

          <div className="checkout__btn-row">
            <Button className="third-button">Continue & Pay</Button>
          </div>
        </Col>
      </Row>
    </>
  );
};
