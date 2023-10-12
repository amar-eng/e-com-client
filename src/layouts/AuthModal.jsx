import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useUserInfo } from '../hooks/useUserInfo';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../services/slices/usersApiSlice';
import { setCredentials } from '../services/slices/authSlice';
import { toast } from 'react-toastify';

export const AuthModal = ({ show, handleClose, authType, setAuthType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useUserInfo();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (userInfo) {
      handleClose();
    }
  }, [navigate, handleClose]);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Please enter a valid email'),
    password: Yup.string().required('Please enter your password'),
  });

  const registrationValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Please enter a valid email'),
    password: Yup.string()
      .required('Please enter your password')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });
  const validationSchema =
    authType === 'login' ? loginValidationSchema : registrationValidationSchema;

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (authType === 'login') {
        try {
          const res = await login({
            email: values.email,
            password: values.password,
          }).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success('Logged in successfully');
          handleClose();
        } catch (error) {
          setAuthError(error?.data?.message || error.data);
        }
      } else {
        if (values.password !== values.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        try {
          const res = await register({
            name: values.name,
            email: values.email,
            password: values.password,
          }).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success('Registered successfully, please wait');
          handleClose();
        } catch (error) {
          setAuthError(error?.data?.message || error.data);
        }
      }
    },
  });

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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="cart__header-modal">
          {authType === 'login' ? 'Login' : 'Register'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          {authError && <div className="text-danger mb-3">{authError}</div>}
          {authType === 'login' ? (
            <>
              <Form.Group controlId="email">
                <Form.Label className="checkout__label">
                  Email Address
                </Form.Label>
                {renderInput('email', 'Enter Email', 'email')}
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="checkout__label">Password</Form.Label>
                {renderInput('password', 'Enter Password', 'password')}
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group controlId="name">
                <Form.Label className="checkout__label">Name</Form.Label>
                {renderInput('name', 'Enter Name')}
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label className="checkout__label">
                  Email Address
                </Form.Label>
                {renderInput('email', 'Enter Email', 'email')}
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="checkout__label">Password</Form.Label>
                {renderInput('password', 'Enter Password', 'password')}
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label className="checkout__label">
                  Confirm Password
                </Form.Label>
                {renderInput('confirmPassword', 'Confirm Password', 'password')}
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-center">
          {authType === 'login' ? (
            <>
              <Button
                variant="primary"
                type="submit"
                className="third-button mb-2"
              >
                Sign in
              </Button>
              <span
                role="button"
                tabIndex="0"
                className="small link-style link-span"
                onClick={() => setAuthType('register')}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    setAuthType('register');
                  }
                }}
              >
                New Customer? Register
              </span>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                type="submit"
                className=" third-button mb-2"
              >
                Register
              </Button>
              <span
                role="button"
                tabIndex="0"
                className="small link-style link-span"
                onClick={() => setAuthType('login')}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    setAuthType('login');
                  }
                }}
              >
                Already have an account? Login
              </span>
            </>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
