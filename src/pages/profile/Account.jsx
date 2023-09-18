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
      <Row className=" profile-row ">
        <Col className="profile-row__col" md={4}>
          Personal Information
        </Col>
        <Col className="profile-row__col" md={4}>
          Latest Orders
        </Col>
      </Row>
      {/* Fix this up for mobile view */}
      <Row className=" profile-row-bottom">
        <Col className=" profile-row-bottom__col " md={4}>
          <Row className="profile-row__row">Name: {userInfo.name}</Row>
          <Row className="profile-row__row">Email: {userInfo.email}</Row>
          <Row className="profile-row__row">Birthday: {userInfo.birthdate}</Row>
          <Button size="sm">View My Full Account</Button>
        </Col>
        <Col
          className=" profile-row-bottom__col profile-row-bottom__col-right "
          md={4}
        >
          {userOrders &&
            userOrders
              .filter((order) => order.isPaid)
              .slice(-3)
              .map((order) => (
                <Row key={order.id} className="profile-row-bottom__row">
                  <Col md={4}>Order ID: {maskedId(order.id)}</Col>
                  <Col md={4}>
                    Paid On: {generateFormattedDate(order.paidAt)}
                  </Col>
                  <Col className="profile-row-bottom__button" md={4}>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm btn-secondary">
                        See Order Details
                      </Button>
                    </LinkContainer>
                  </Col>
                </Row>
              ))}
          <Button size="sm">View All My Orders</Button>
        </Col>
      </Row>
    </>
  );
};
