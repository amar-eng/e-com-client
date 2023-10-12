import { Carousel, Col, Row } from 'react-bootstrap';
import { BasicCard } from '../components/BasicCard';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../services/slices/productsApiSlice';
import { useState } from 'react';
import { SectionHeader } from '../components/SectionHeaders';
import { useWindowWidth } from '../hooks/useWindowWidth';

export const FeaturedScents = () => {
  const [index, setIndex] = useState(0);
  const windowWidth = useWindowWidth();

  const { pageNumber, keyword } = useParams();
  const { data } = useGetProductsQuery({ pageNumber, keyword });

  const filteredProducts =
    data?.products?.filter((product) => product.isFeatured) || [];

  let itemsToShow;
  if (windowWidth <= 770) {
    // mobile
    itemsToShow = 1;
  } else if (windowWidth <= 1192) {
    // tablet
    itemsToShow = 2;
  } else {
    // desktop
    itemsToShow = 3;
  }

  const productChunks = [];
  for (let i = 0; i < filteredProducts.length; i += itemsToShow) {
    productChunks.push(filteredProducts.slice(i, i + itemsToShow));
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <SectionHeader text="Our Top Selected Scents" />
      <Carousel
        interval={null}
        activeIndex={index}
        onSelect={handleSelect}
        prevIcon={index > 0 && <span className="carousel-control-prev-icon" />}
        nextIcon={
          index < productChunks.length - 1 && (
            <span className="carousel-control-next-icon" />
          )
        }
      >
        {productChunks.map((chunk, idx) => (
          <Carousel.Item key={idx} clas>
            <Row className="justify-content-center">
              {chunk.map((product) => (
                <Col md={5} lg={4} xl={3} key={product._id}>
                  <BasicCard
                    name={product.name}
                    occasion={product.occasion}
                    rating={product.rating}
                    image={product.image}
                    id={product._id}
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};
