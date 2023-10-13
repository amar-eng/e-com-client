import { Row, Col, Form } from 'react-bootstrap';
import { useGetProductsQuery } from '../services/slices/productsApiSlice';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { useNavigate, useParams } from 'react-router-dom';
import { Paginate } from '../components/Paginate';
import { Banner } from '../components/Banner';
import { exploreData } from '../utils/heroData';
import { SearchBox } from '../components/Searchbox';
import { SectionHeader } from '../components/SectionHeaders';
import { useEffect, useState } from 'react';
import { CardComponent } from '../components/CardComponent';

export const ExploreScents = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const navigate = useNavigate();

  const [occasionFilter, setOccasionFilter] = useState('');
  const [concentrationFilter, setConcentrationFilter] = useState('');
  const [seasonFilter, setSeasonFilter] = useState('');
  const [resetSearch, setResetSearch] = useState(false);

  const resetFilters = () => {
    setOccasionFilter('');
    setConcentrationFilter('');
    setSeasonFilter('');
    setResetSearch(true);

    navigate('/explore-scents');
  };

  useEffect(() => {
    if (resetSearch) {
      setResetSearch(false);
    }
  }, [resetSearch]);

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
          <Banner {...exploreData} />

          <div className="search-box-wrapper">
            <SearchBox reset={resetSearch} />
          </div>
          <div className="filter-wrapper">
            <Row className="align-items-center filter-row">
              <Col xs={6} md={3} className="mb-3">
                <Form.Control
                  as="select"
                  value={occasionFilter}
                  onChange={(e) => setOccasionFilter(e.target.value)}
                  className={`select-filter ${
                    occasionFilter ? 'select-filter--active' : ''
                  }`}
                >
                  <option value=""> Filter Occasions </option>
                  <option value="Night-Out">Night Out</option>
                  <option value="Everyday-Essentials">
                    Everyday Essentials
                  </option>
                  <option value="Elegant-Occasions">Elegant Occasions</option>
                  <option value="Professional-Aura">Professional Aura</option>
                </Form.Control>
              </Col>
              <Col xs={6} md={3} className="mb-3">
                <Form.Control
                  as="select"
                  value={concentrationFilter}
                  onChange={(e) => setConcentrationFilter(e.target.value)}
                  className={`select-filter ${
                    concentrationFilter ? 'select-filter--active' : ''
                  }`}
                >
                  <option value="">Filter Vibe</option>
                  <option value="Eau de Parfum">Eau de Parfum</option>
                  <option value="Eau de Toilette">Eau de Toilette</option>
                  <option value="Eau de Cologne">Eau de Cologne</option>
                  <option value="Parfum">Parfum</option>
                </Form.Control>
              </Col>
              <Col xs={6} md={3} className="mb-3">
                <Form.Control
                  as="select"
                  value={seasonFilter}
                  onChange={(e) => setSeasonFilter(e.target.value)}
                  className={`select-filter ${
                    seasonFilter ? 'select-filter--active' : ''
                  }`}
                >
                  <option value="">Filter Season</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="fall">Fall</option>
                  <option value="winter">Winter</option>
                </Form.Control>
              </Col>
              <Col xs={6} md={3} className="mb-3">
                <div className="reset-btn" onClick={resetFilters}>
                  Clear Filters
                </div>
              </Col>
            </Row>
          </div>

          <SectionHeader
            text={
              occasionFilter || concentrationFilter || seasonFilter
                ? 'Your Filtered Scents'
                : 'Explore Scents'
            }
          />

          {data && (
            <div>
              <Row>
                {data.products
                  .filter((product) => {
                    return (
                      (!occasionFilter ||
                        product.occasion === occasionFilter) &&
                      (!concentrationFilter ||
                        product.concentration === concentrationFilter) &&
                      (!seasonFilter || product.season === seasonFilter)
                    );
                  })
                  .map((product) => (
                    <Col
                      sm={6}
                      md={6}
                      lg={4}
                      xl={3}
                      key={product.id}
                      className="d-flex align-item-center justify-content-center"
                    >
                      <CardComponent {...product} />
                    </Col>
                  ))}
              </Row>
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
