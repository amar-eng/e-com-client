import { Button, Table, Row, Col } from 'react-bootstrap';
import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../services/slices/productsApiSlice';
import { del, editBlack, add } from '../../utils/lists';
import { ProfileHeader } from '../../components/ProfileHeader';
import { toast } from 'react-toastify';
import { getTokenFromLocalStorage } from '../../utils/sliceUtils/userUtils';
import { isTokenExpired } from '../../utils/common';
import { useParams } from 'react-router-dom';
import { Paginate } from '../../components/Paginate';

export const ProductList = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        toast.success('Product deleted successfully!');
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  const createProductHandler = async () => {
    const token = getTokenFromLocalStorage();

    if (isTokenExpired(token)) {
      toast.error('Session Expired please log back in');
      return;
    }

    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
        toast.success('Product created!');
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

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

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
                data.products.map((product) => (
                  <tr key={product.id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
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
          <Paginate page={data.page} pages={data.pages} isAdmin={true} />
        </>
      )}
    </>
  );
};
