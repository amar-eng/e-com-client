import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../services/slices/productsApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import { Paginate } from '../components/Paginate';

export const ExploreScents = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

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
          <h1>Explore Scents</h1>
          <Row>
            {data.products.map((product) => (
              <LinkContainer
                to={`/explore-scents/${product.id}`}
                key={product.id}
              >
                <Col>{product.name}</Col>
              </LinkContainer>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};
