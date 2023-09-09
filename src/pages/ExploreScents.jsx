import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../services/slices/productsApiSlice';
import { LinkContainer } from 'react-router-bootstrap';

export const ExploreScents = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data</p>
      ) : (
        <>
          <h1>Explore</h1>
          <Row>
            {products.map((product) => (
              <LinkContainer to={`/explore-scents/${product.id}`}>
                <Col key={product.id}>{product.name}</Col>
              </LinkContainer>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
