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
import { ProfileHeader } from '../../components/ProfileHeader';

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
    <Col md={11} className="orders-col">
      <ProfileHeader headerText="My Orders" />
      {loadingOrders ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Error fetching orders</Message>
      ) : userOrders.length === 0 ? (
        <Message>Your order history is empty.</Message>
      ) : (
        <Table striped hover className="table-sm">
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
                <td data-label="Order ID">{maskedId(order._id)}</td>
                <td data-label="Created Date">
                  {generateFormattedDate(order.createdAt)}
                </td>
                <td data-label="Total">${order.totalPrice.toFixed(2)}</td>
                <td data-label="Paid">
                  {order.isPaid ? (
                    <>
                      <img src={check} alt="paid" style={{ width: '20px' }} />
                      {generateFormattedDate(order.paidAt)}
                    </>
                  ) : (
                    <>
                      <img src={x} alt="not paid" style={{ width: '20px' }} />
                    </>
                  )}
                </td>

                <td data-label="Delivered">
                  {order.isDelivered ? (
                    <>
                      <img
                        src={check}
                        alt="delivered"
                        style={{
                          width: '20px',
                        }}
                      />
                      {generateFormattedDate(order.deliveredAt)}
                    </>
                  ) : (
                    <img
                      src={x}
                      alt="not-delivered"
                      style={{
                        width: '20px',
                      }}
                    />
                  )}
                </td>

                <Col xs={12}>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button
                      variant="primary"
                      className="btn-sm fullWidthButton"
                      xs={12}
                    >
                      See Order Details
                    </Button>
                  </LinkContainer>
                </Col>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Col>
  );
};
