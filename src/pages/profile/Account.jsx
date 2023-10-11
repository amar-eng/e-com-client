import { Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { useGetMyOrdersQuery } from '../../services/slices/ordersApiSlice';

import { maskedId } from '../../utils/common';

import { ProfileHeader } from '../../components/ProfileHeader';

export const Account = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: userOrders } = useGetMyOrdersQuery(userInfo.id);

  return (
    <>
      <ProfileHeader headerText="My Account" />

      <Row className="account-row">
        <Col md={4}>
          <Col className="account-row__col">Personal Information</Col>
          <Col className="account-row-col">
            <Row className="profile-row__row">Name: {userInfo.name}</Row>
            <Row className="profile-row__row">Email: {userInfo.email}</Row>

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
