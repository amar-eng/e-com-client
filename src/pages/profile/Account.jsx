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

export const Account = () => {
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
    <>
      <ProfileHeader headerText="My Account" />

      <Row className="account-row">
        <Col md={4}>
          <Col className="account-row__col">Personal Information</Col>
          <Col className="account-row-col">
            <Row className="profile-row__row">Name: {userInfo.name}</Row>
            <Row className="profile-row__row">Email: {userInfo.email}</Row>
            <Row className="profile-row__row">
              Birthday: {userInfo.birthdate}
            </Row>
            <LinkContainer to={`/my-profile`}>
              <Button size="sm">View My Profile</Button>
            </LinkContainer>
          </Col>
        </Col>
        <Col md={4}>
          <Col className="account-row__col">Latest Orders</Col>
          <Col className="account-row-col">
            {userOrders &&
              userOrders
                .filter((order) => order.isPaid)
                .slice(-3)
                .map((order) => (
                  <Row key={order.id} className="account-row__items">
                    <Col md={7}>Order ID: {maskedId(order.id)}</Col>

                    <Col className="profile-row-bottom__button" md={5}>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm btn-secondary">
                          See Order Details
                        </Button>
                      </LinkContainer>
                    </Col>
                  </Row>
                ))}
            <LinkContainer to={`/my-orders`}>
              <Button size="sm">See All My Orders</Button>
            </LinkContainer>
          </Col>
        </Col>
      </Row>
    </>
  );
};
