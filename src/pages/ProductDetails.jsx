import { Row, Col } from 'react-bootstrap';
import { useGetProductDetailsQuery } from '../services/slices/productsApiSlice';
import { useParams } from 'react-router-dom';

export const ProductDetails = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(productId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error?.data?.message || 'Error loading product details'}</p>;
  }

  const scent = product.product;

  return (
    <>
      <Row>
        <Col>
          <img src={scent.image} alt={scent.name} />
        </Col>
      </Row>
    </>
  );
};
