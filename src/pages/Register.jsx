import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { useRegisterMutation } from '../services/slices/usersApiSlice';
import { setCredentials } from '../services/slices/authSlice';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Please enter a valid email'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Please enter your password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await register(values).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success('Registered successfully, please wait');
      } catch (error) {
        toast.error(error?.data?.message || error.data);
      }
    },
  });

  const renderInput = (name, placeholder, type = 'text') => (
    <>
      <Form.Control
        type={type}
        placeholder={placeholder}
        className={`checkout__input ${
          formik.touched[name] && formik.errors[name] ? 'is-invalid' : ''
        }`}
        {...formik.getFieldProps(name)}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-danger">{formik.errors[name]}</div>
      )}
    </>
  );

  return (
    <Row className="mx-5">
      <h1 className="login_header">Register</h1>
      <Row className="mx-5">
        <Col xl={6}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="name" className="my-3 ">
              {renderInput('name', 'Enter Name')}
            </Form.Group>
            <Form.Group controlId="email" className="my-3 ">
              {renderInput('email', 'Enter Email', 'email')}
            </Form.Group>
            <Form.Group controlId="password" className="my-3 ">
              {renderInput('password', 'Enter Password', 'password')}
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="my-3 ">
              {renderInput('confirmPassword', 'Confirm Password', 'password')}
            </Form.Group>
            <Button
              type="submit"
              variant="warning"
              className="third-button my-2"
              disabled={isLoading}
            >
              Register
            </Button>
            {isLoading && <Loader />}
          </Form>
          <Row>
            <Col>
              Already have an account?{' '}
              <Link
                className="small"
                to={redirect ? `/login?redirect=${redirect}` : '/login'}
              >
                Login
              </Link>
            </Col>
          </Row>
        </Col>
        <Col xs={4} className="hero__image"></Col>
      </Row>
    </Row>
  );
};
