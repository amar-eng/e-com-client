import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ProfileHeader } from '../../components/ProfileHeader';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { toast } from 'react-toastify';
import { FormContainer } from '../../components/FormContainer';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../services/slices/usersApiSlice';

export const EditUser = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin,
      }).unwrap();
      toast.success('User updated');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <ProfileHeader headerText="Edit User" />
      <Link
        to="/admin/userList"
        vairant="secondary"
        className="btn btn-light my-3"
      >
        Go Back
      </Link>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" vairant="primary" size="sm">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
