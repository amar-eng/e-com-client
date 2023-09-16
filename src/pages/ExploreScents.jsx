import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../services/slices/productsApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

export const ExploreScents = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message>
          {error?.data?.message || 'Error loading product details'}
        </Message>
      ) : (
        <>
          <h1>Explore</h1>
          <Row>
            {products.map((product) => (
              <LinkContainer
                to={`/explore-scents/${product.id}`}
                key={product.id}
              >
                <Col>{product.name}</Col>
              </LinkContainer>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
