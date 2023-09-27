import { Button, Table } from 'react-bootstrap';
import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { useGetOrdersQuery } from '../../services/slices/ordersApiSlice';
import { x, check } from '../../utils/lists';
import { generateFormattedDate } from '../../utils/common';

export const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return (
    <>
      <h1>Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[...orders]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{generateFormattedDate(order.createdAt)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      <>
                        <img src={check} alt="delivered" />
                        {generateFormattedDate(order.paidAt)}
                      </>
                    ) : (
                      <img src={x} alt="order-paid" />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <>
                        <img src={check} alt="delivered" />
                        {generateFormattedDate(order.deliveredAt)}
                      </>
                    ) : (
                      <img src={x} alt="order-paid" />
                    )}
                  </td>

                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="secondary" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
