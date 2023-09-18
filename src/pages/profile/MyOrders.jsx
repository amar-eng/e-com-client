import { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { useProfileMutation } from '../../services/slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../../services/slices/ordersApiSlice';
import { setCredentials } from '../../services/slices/authSlice';
import { generateFormattedDate, maskedId } from '../../utils/common';
import { x, check } from '../../utils/lists';

export const MyOrders = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const {
    data: userOrders,
    isLoading: loadingOrders,
    error,
  } = useGetMyOrdersQuery(userInfo.id);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const authToken = userInfo.token;
        const res = await updateProfile({
          data: {
            id: userInfo.id,
            name,
            email,
            password,
          },
          token: authToken,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        const errorMessage =
          err?.data?.message === 'Access denied. No token provided.'
            ? 'Please re-login to update your profile again'
            : err?.data?.message || err.error;

        toast.error(errorMessage);
      }
    }
  };

  return (
    <Row className="d-flex justify-content-space-between">
      <Col md={3}>
        <h4>User Profile</h4>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="warning">
            Update Profile
          </Button>

          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h4>My Orders</h4>
        {loadingOrders ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">Error fetching orders</Message>
        ) : userOrders.length === 0 ? (
          <Message>Your order history is empty.</Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Created Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <tr key={order._id}>
                  <td>{maskedId(order._id)}</td>
                  <td>{generateFormattedDate(order.createdAt)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      <>
                        <img
                          src={check}
                          alt="paid"
                          style={{
                            width: '30px',
                          }}
                        />
                        {generateFormattedDate(order.paidAt)}
                      </>
                    ) : (
                      'Not Paid'
                    )}
                  </td>

                  <td>
                    {order.isDelivered ? (
                      <>
                        <img
                          src={check}
                          alt="delivered"
                          style={{
                            width: '30px',
                          }}
                        />
                        {generateFormattedDate(order.deliveredAt)}
                      </>
                    ) : (
                      <img
                        src={x}
                        alt="not-delivered"
                        style={{
                          width: '30px',
                        }}
                      />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        See Order Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};
