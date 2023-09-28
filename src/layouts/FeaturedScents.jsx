import { Carousel, Col, Row } from 'react-bootstrap';
import { BasicCard } from '../components/BasicCard';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../services/slices/productsApiSlice';
import { useState } from 'react';
import { SectionHeader } from '../components/SectionHeaders';

export const FeaturedScents = () => {
  const [index, setIndex] = useState(0);

  const { pageNumber, keyword } = useParams();
  const { data } = useGetProductsQuery({ pageNumber, keyword });

  const filteredProducts =
    data?.products?.filter((product) => product.isFeatured) || [];
  const productChunks = [];

  for (let i = 0; i < filteredProducts.length - 1; i++) {
    productChunks.push(filteredProducts.slice(i, i + 3));
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <SectionHeader text="Featured Scents" />
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
          <Carousel.Item key={idx}>
            <Row className="justify-content-center">
              {chunk.map((product) => (
                <Col md={4} key={product._id}>
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
