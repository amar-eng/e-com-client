import { Button, Table, Row, Col } from 'react-bootstrap';
import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { useGetProductsQuery } from '../../services/slices/productsApiSlice';
import { x, check, edit, del, editBlack } from '../../utils/lists';
import { generateFormattedDate } from '../../utils/common';

export const ProductList = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  console.log(data);

  const deleteHandler = () => {
    console.log('deleted');
  };

  return (
    <>
      <Row>
        <Col>Products</Col>
        <Col className="text-end">
          <Button className="btn-sm m-3">
            Create a Product <img src={edit} alt="edit-button-icon" />
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((product) => (
                  <tr key={product.id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category?.grade}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <img src={editBlack} alt="edit-button-icon" />
                      </LinkContainer>

                      <img
                        src={del}
                        alt="delete-button-icon"
                        onClick={() => deleteHandler(product._id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};
