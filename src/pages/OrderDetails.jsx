import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from '../services/slices/ordersApiSlice';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { generateFormattedDate } from '../utils/common';

export const OrderDetails = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'CAD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Order is paid');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();

    toast.success('Order is paid');
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverHandler = async () => {
    if (!orderId) {
      toast.error('Order ID is missing. Cannot mark order as delivered.');
      return;
    }

    try {
      const response = await deliverOrder(orderId);

      if (response && response.error) {
        throw new Error(response.error.message);
      }
      refetch();
      toast.success('Order marked as delivered');
    } catch (error) {
      console.error('Error: ', error);
      toast.error(error?.data?.message || 'Failed to mark order as delivered');
    }
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger">{isError.error}</Message>
  ) : (
    <>
      <h1 className="checkout__header" style={{ margin: '1rem' }}>
        Order: {order.id}
      </h1>
      <Row className="mx-1 d-flex justify-content-space-between">
        <Col md={6}>
          <ListGroup className="custom-list-group" variant="flush">
            <ListGroup.Item>
              <h3 className="checkout__header">Shipping Details</h3>
              <p className="checkout__price">
                <span>Name:</span> {order.user.name}
              </p>
              <p className="checkout__price">
                <span>Email:</span> {order.user.email}
              </p>
              <p className="checkout__price">
                <span>Address:</span> {order.shippingAddress1}, {order.city}{' '}
                {order.state}, {order.country}, {order.postalCode}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered at {generateFormattedDate(order.deliveredAt)}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered yet</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3 className="checkout__header">Payment Method</h3>
              <p className="checkout__price">
                <span>Method:</span> {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant="success">
                  Paid on {generateFormattedDate(order.paidAt)}
                </Message>
              ) : (
                <Message variant="danger">Not Paid Yet</Message>
              )}
            </ListGroup.Item>

            <div>
              <h3 className="checkout__header">Order Items</h3>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                order.orderItems.map((item, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <Row className="d-flex align-items-center justify-content-center">
                        <Col xs={2}>
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/explore-scents/${item.product._id}`}>
                            <p className="checkout__price">
                              {item.product.name}
                            </p>
                          </Link>
                        </Col>
                        <Col>
                          <div className="checkout__price">
                            {item.qty} x ${item.product.price} =
                            <span className="checkout__amount--orange">
                              ${item.qty * item.product.price}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })
              )}
            </div>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card className="p-3">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="checkout__header">Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="checkout__price">Items</Col>
                  <Col className="checkout__price">${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="checkout__price">Shipping</Col>
                  <Col className="checkout__price">${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="checkout__price">Tax</Col>
                  <Col className="checkout__price">${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="checkout__price">Total</Col>
                  <Col className="checkout__amount--orange">
                    ${order.totalPrice.toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApproveTest}
                        className="third-button my-3"
                      >
                        Test Pay Order
                      </Button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
