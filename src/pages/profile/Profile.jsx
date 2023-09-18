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

export const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

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
    <Row className="d-flex justify-content-center align-items-center">
      <Col md={8}>
        <h4>Account Profile</h4>
        <p>
          Please review your information below and add any missing information.
        </p>
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
          <Button type="submit">Update Profile</Button>

          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
    </Row>
  );
};
