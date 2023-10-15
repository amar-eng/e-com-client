import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { useLoginMutation } from '../services/slices/usersApiSlice';
import { setCredentials } from '../services/slices/authSlice';
import { toast } from 'react-toastify';
import { notifySuccess } from '../components/notifications';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Please enter a valid email'),
    password: Yup.string().required('Please enter your password'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await login(values).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        notifySuccess('Logged in successfully');
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
      <h1 className="login_header">Login</h1>
      <Row>
        <Col xl={6}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="email" className="my-3 ">
              {renderInput('email', 'Enter Email', 'email')}
            </Form.Group>
            <Form.Group controlId="password" className="my-3 ">
              {renderInput('password', 'Enter Password', 'password')}
            </Form.Group>
            <Button
              type="submit"
              variant="warning"
              className=" third-button my-2"
              disabled={isLoading}
            >
              Sign In
            </Button>
            {isLoading && <Loader />}
          </Form>
          <Row>
            <Col>
              New Customer?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Register
              </Link>
            </Col>
          </Row>
        </Col>
        <Col xs={4} className="hero__image"></Col>
      </Row>
    </Row>
  );
};
