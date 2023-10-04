import { Row, Col, Form } from 'react-bootstrap';
import { useGetProductsQuery } from '../services/slices/productsApiSlice';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { useParams } from 'react-router-dom';
import { Paginate } from '../components/Paginate';
import { Banner } from '../components/Banner';
import { exploreData } from '../utils/heroData';
import { SearchBox } from '../components/Searchbox';
import { SectionHeader } from '../components/SectionHeaders';
import { useState } from 'react';
import { CardComponent } from '../components/CardComponent';

export const ExploreScents = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const [occasionFilter, setOccasionFilter] = useState('');
  const [concentrationFilter, setConcentrationFilter] = useState('');
  const [seasonFilter, setSeasonFilter] = useState('');

  const resetFilters = () => {
    setOccasionFilter('');
    setConcentrationFilter('');
    setSeasonFilter('');
  };
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
            <SearchBox />
          </div>
          <div className="filter-wrapper">
            <Row className="w-50 align-items-center">
              <Col md={3}>
                <Form.Control
                  as="select"
                  value={occasionFilter}
                  onChange={(e) => setOccasionFilter(e.target.value)}
                  className="select-filter"
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
              <Col md={3}>
                <Form.Control
                  as="select"
                  value={concentrationFilter}
                  onChange={(e) => setConcentrationFilter(e.target.value)}
                  className="select-filter"
                >
                  <option value="">Filter Vibe</option>
                  <option value="Eau de Parfum">Eau de Parfum</option>
                  <option value="Eau de Toilette">Eau de Toilette</option>
                  <option value="Eau de Cologne">Eau de Cologne</option>
                  <option value="Parfum">Parfum</option>
                </Form.Control>
              </Col>
              <Col md={3}>
                <Form.Control
                  as="select"
                  value={seasonFilter}
                  onChange={(e) => setSeasonFilter(e.target.value)}
                  className="select-filter"
                >
                  <option value="">Filter Season</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="fall">Fall</option>
                  <option value="winter">Winter</option>
                </Form.Control>
              </Col>
              <Col md={3}>
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
                      md={3}
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
