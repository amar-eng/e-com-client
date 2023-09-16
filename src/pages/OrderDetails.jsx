import { Link, useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../services/slices/ordersApiSlice';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Col, ListGroup, Row, Image, Card } from 'react-bootstrap';

export const OrderDetails = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  console.log(order);
  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger">{isError.error}</Message>
  ) : (
    <>
      <h1>Order: {order.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup className="custom-list-group" variant="flush">
            <ListGroup.Item>
              <h3>Shipping Details</h3>
              <p>
                <span>Name:</span> {order.user.name}
              </p>
              <p>
                <span>Email:</span> {order.user.email}
              </p>
              <p>
                <span>Address:</span> {order.shippingAddress1}, {order.city}{' '}
                {order.state}, {order.country}, {order.postalCode}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered at {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered yet</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p>
                <span>Method:</span> {order.paymentMethod}
              </p>
              <p>
                <span>Amount:</span> ${order.totalPrice.toFixed(2)}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">
                  Payment is processing, please contact us if it persists for
                  more than 2 days
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Order Items</h3>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row className="d-flex align-items-center">
                      <Col md={1} className="p-1">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <Link to={`/explore-scents/${item.product._id}`}>
                          <p>{item.product.name}</p>
                        </Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.product.price} = $
                        {item.qty * item.product.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
