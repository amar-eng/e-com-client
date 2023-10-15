import React, { useEffect } from 'react';
import { Col, ListGroup, Row, Image, Button, Form } from 'react-bootstrap';
import { useCart, useCartItems } from '../hooks/useCartInfo';
import { Link, useNavigate } from 'react-router-dom';
import { GoBack } from '../components/GoBack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} from '../services/slices/cartSlice';
import { useUserInfo } from '../hooks/useUserInfo';
import { useCreateOrderMutation } from '../services/slices/ordersApiSlice';
import { toast } from 'react-toastify';

export const Checkout = () => {
  const cart = useCart();
  const cartItems = useCartItems();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createOrder] = useCreateOrderMutation();

  const { id, name, email } = useUserInfo();

  const lastProductId = cartItems[cartItems.length - 1]?.product?._id;
  const { totalPrice, shippingPrice, itemsPrice, taxPrice } = useCart();

  const validationSchema = Yup.object().shape({
    billingName: Yup.string().required('Please enter a valid name'),
    billingEmail: Yup.string()
      .email('Invalid email format')
      .required('Please enter a valid email'),
    billingPhone: Yup.string()
      .max(12, 'We Only accept US and Candian Phone Numbers at this moment')
      .required('Please enter a valid phone number'),
    shippingAddress: Yup.string().required('Please enter a valid address'),
    shippingPostalCode: Yup.string().required(
      'Please enter a valid Canadian postal code / US zip code'
    ),

    shippingCity: Yup.string().required('City is required'),
    shippingState: Yup.string().required('State is required'),
    shippingCountry: Yup.string()
      .oneOf(['USA', 'Canada'], 'Country must be either USA or Canada')
      .required('Country is required'),

    paymentMethod: Yup.string().required('Please choose a payment method'),
  });

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    let formattedValue;
    if (rawValue.length <= 3) {
      formattedValue = rawValue;
    } else if (rawValue.length <= 6) {
      formattedValue = rawValue.replace(/(\d{3})(\d{0,3})/, '$1-$2');
    } else {
      formattedValue = rawValue.replace(/(\d{3})(\d{3})(\d{0,4})/, '$1-$2-$3');
    }
    formik.setFieldValue('billingPhone', formattedValue);
  };

  const handlePostalCodeChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/\W/g, ''); // Remove non-alphanumeric and convert to uppercase
    if (isNaN(value.charAt(0))) {
      value = value.replace(/(\w\w\w)(\w\w\w)?/, '$1-$2').trim(); // Format as XXX-XXX
    }
    formik.setFieldValue('shippingPostalCode', value);
  };

  const placeOrderHandler = async () => {
    try {
      const orderItems = cart.cartItems.map((item) => ({
        qty: item.qty,
        product: item.product._id,
      }));

      const user = id;
      const address = formik.values.shippingAddress;
      const city = formik.values.shippingCity;
      const postalCode = formik.values.shippingPostalCode;
      const state = formik.values.shippingState;
      const country = formik.values.shippingCountry;
      const phoneNumber = formik.values.billingPhone;

      const res = await createOrder({
        orderItems,
        shippingAddress1: address,
        city: city,
        postalCode: postalCode,
        state: state,
        country: country,
        user,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        paymentMethod: cart.paymentMethod,
        phoneNumber: phoneNumber,
        taxPrice: cart.taxPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res.id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      billingName: name || '',
      billingEmail: email || '',
      billingPhone: '',
      shippingAddress: '',
      shippingPostalCode: '',
      shippingCity: '',
      shippingState: '',
      shippingCountry: '',
      paymentMethod: 'PayPal',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      placeOrderHandler();
    },
  });

  useEffect(() => {
    if (
      formik.values.shippingAddress &&
      formik.values.shippingPostalCode &&
      formik.values.shippingCity &&
      formik.values.shippingState &&
      formik.values.shippingCountry
    ) {
      dispatch(
        saveShippingAddress({
          address: formik.values.shippingAddress,
          postalCode: formik.values.shippingPostalCode,
          city: formik.values.shippingCity,
          state: formik.values.shippingState,
          country: formik.values.shippingCountry,
        })
      );
    }

    if (formik.values.paymentMethod) {
      dispatch(savePaymentMethod(formik.values.paymentMethod));
    }
  }, [formik.values, dispatch]);

  const renderInput = (name, placeholder, type = 'text', onChange) => (
    <>
      <Form.Control
        type={type}
        placeholder={placeholder}
        className={`checkout__input ${
          formik.touched[name] && formik.errors[name] ? 'is-invalid' : ''
        }`}
        {...formik.getFieldProps(name)}
        onChange={onChange || formik.handleChange}
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
      <Form onSubmit={formik.handleSubmit}>
        <Row className="checkout">
          <Col xs={11} md={11} lg={7} className="checkout__col ">
            <div>
              <h1>Checkout</h1>

              {/* Billing Details */}
              <h4 className="checkout__header">Billing Details</h4>
              <Row>
                <Col xs={12} md={6}>
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
                    {renderInput(
                      'billingPhone',
                      formik.values.billingPhone || '123-456-7890',
                      'tel',
                      handlePhoneChange
                    )}
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
                  <Form.Group controlId="shippingPostalCode">
                    <Form.Label className="checkout__label">
                      Postal / Zip Code
                    </Form.Label>
                    {renderInput(
                      'shippingPostalCode',
                      formik.values.shippingPostalCode || '',
                      'text',
                      handlePostalCodeChange
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="shippingCity">
                    <Form.Label className="checkout__label">City</Form.Label>
                    {renderInput('shippingCity', 'Dallas')}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="shippingCountry">
                    <Form.Label className="checkout__label">
                      Province / State
                    </Form.Label>
                    {renderInput('shippingState', 'Texas')}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="shippingCountry">
                    <Form.Label className="checkout__label">Country</Form.Label>
                    {renderInput('shippingCountry', 'USA')}
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
                      checked={formik.values.paymentMethod === 'PayPal'}
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
                      checked={formik.values.paymentMethod === 'CreditCard'}
                      onChange={formik.handleChange}
                      style={{ cursor: 'pointer' }}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </div>
          </Col>
          <Col xs={11} md={7} lg={4} className="checkout__col checkout__col-2">
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
                      <Col sm={4} xs={3} md={4} lg={2}>
                        <Link to={`/explore-scents/${item.product._id}`}>
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fluid
                            rounded
                          />
                        </Link>
                      </Col>

                      <Col sm={5} xs={7} md={6} lg={7}>
                        <Row className="cart__name">{item.product.name}</Row>
                        <Row className="cart__price">${item.product.price}</Row>
                      </Col>

                      <Col xs={1}>x{item.qty}</Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}

            <Row className="mt-4">
              <Col xs={9} md={8} lg={9}>
                <p className="checkout__price">Price</p>
              </Col>
              <Col>
                <p className="checkout__amount">${itemsPrice}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={9} md={8} lg={9}>
                <p className="checkout__price">Shipping</p>
              </Col>
              <Col>
                <p className="checkout__amount">${shippingPrice}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={9} md={8} lg={9}>
                <p className="checkout__price">Tax</p>
              </Col>
              <Col>
                <p className="checkout__amount">${taxPrice}</p>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs={9} md={8} lg={9}>
                <p className="checkout__price">Grand Total</p>
              </Col>
              <Col>
                <p className="checkout__amount checkout__amount--orange">
                  ${totalPrice}
                </p>
              </Col>
            </Row>

            <div className="checkout__btn-row">
              <Button
                className="third-button"
                type="submit"
                disabled={cart.cartItems === 0}
              >
                Continue & Pay
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};
