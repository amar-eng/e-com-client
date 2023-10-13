import { Table, Button, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useUserInfo } from '../../hooks/useUserInfo';
import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { useGetMyOrdersQuery } from '../../services/slices/ordersApiSlice';
import { generateFormattedDate, maskedId } from '../../utils/common';
import { x, check } from '../../utils/lists';
import { ProfileHeader } from '../../components/ProfileHeader';

export const MyOrders = () => {
  const userInfo = useUserInfo();

  const {
    data: userOrders,
    isLoading: loadingOrders,
    error,
  } = useGetMyOrdersQuery(userInfo.id);

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
