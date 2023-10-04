import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          let baseLink = !isAdmin ? '/explore-scents' : '/admin/productlist';

          if (keyword) {
            baseLink = `${baseLink}/search/${keyword}`;
          }

          return (
            <LinkContainer key={x + 1} to={`${baseLink}/page/${x + 1}`}>
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
};
