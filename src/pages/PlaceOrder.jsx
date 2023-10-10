import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { CheckoutSteps } from '../layouts/CheckoutSteps';
import {
  useCartItems,
  useCart,
  usePaymentMethod,
  useShippingAddress,
} from '../hooks/useCartInfo';
import { FormContainer } from '../components/FormContainer';
import { toast } from 'react-toastify';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { useCreateOrderMutation } from '../services/slices/ordersApiSlice';
import { clearCartItems } from '../services/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { useUserInfo } from '../hooks/useUserInfo';

export const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { address, city, postalCode, state, country } = useShippingAddress();
  const paymentMethod = usePaymentMethod();
  const cartItems = useCartItems();
  const cart = useCart();
  const { id } = useUserInfo();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [paymentMethod, address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const orderItems = cart.cartItems.map((item) => ({
        qty: item.qty,
        product: item.product._id,
      }));

      const user = id;

      const phoneNumber = '+420702241333';
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
        phoneNumber,
        taxPrice: cart.taxPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res.id}`);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <FormContainer>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Shopping Summary </h3>
                <p>
                  <span>Address: </span>
                  {address}, {city}, {state}.
                </p>
                <p>
                  {postalCode}, {country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Payment Method</h3>
                <p>
                  <span>Method: </span>
                  {paymentMethod}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h3>Order Items</h3>
                {cartItems.length === 0 ? (
                  <Message>Your Cart is Empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row className="d-flex align-items-center">
                          <Col md={1} className="p-1">
                            <Image
                              src={item.product.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/explore-scents/${item.product.id}`}>
                              <p>{item.product.name}</p>
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.product.price} = $
                            {item.qty * item.product.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && (
                  <Message variant="danger">{error.data.message}</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};
