import { Button, Table, Row, Col } from 'react-bootstrap';
import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from '../../services/slices/productsApiSlice';
import { del, editBlack, add } from '../../utils/lists';
import { ProfileHeader } from '../../components/ProfileHeader';
import { toast } from 'react-toastify';

export const ProductList = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const deleteHandler = () => {
    console.log('deleted');
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <Row className="d-flex align-items-center">
        <ProfileHeader headerText="Products" />
        <Col className="text-end">
          <Button
            className="btn-sm m-3"
            variant="secondary"
            onClick={createProductHandler}
          >
            Create a Product{' '}
            <img src={add} alt="edit-button-icon" style={{ width: '20px' }} />
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
