import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Loader } from '../../components/Loader';
import { useProfileMutation } from '../../services/slices/usersApiSlice';
import { setCredentials } from '../../services/slices/authSlice';
import { ProfileHeader } from '../../components/ProfileHeader';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const profileValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Please enter a valid email'),
    password: Yup.string().min(
      8,
      'Password must be at least 8 characters long'
    ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const formik = useFormik({
    initialValues: {
      name: userInfo.name,
      email: userInfo.email,
      password: '',
      confirmPassword: '',
    },
    validationSchema: profileValidationSchema,
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      try {
        const authToken = userInfo.token;
        const res = await updateProfile({
          data: {
            id: userInfo.id,
            name: values.name,
            email: values.email,
            password: values.password,
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
    <Row className="d-flex justify-content-center align-items-center">
      <Col md={8}>
        <ProfileHeader headerText="My Profile" />
        <p style={{ textAlign: 'center' }}>
          Please review your information below and add any missing information.
        </p>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            {renderInput('name', 'Enter Name')}
          </Form.Group>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            {renderInput('email', 'Enter Email', 'email')}
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            {renderInput('password', 'Enter Password', 'password')}
          </Form.Group>
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            {renderInput('confirmPassword', 'Confirm Password', 'password')}
          </Form.Group>
          <Button type="submit">Update Profile</Button>

          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
    </Row>
  );
};
