import { useState } from 'react';
import { Row, Col, Button, ListGroup, Form } from 'react-bootstrap';
import { useGetProductDetailsQuery } from '../services/slices/productsApiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { addToCart } from '../services/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { generateQuantitySelectOptions } from '../utils/common';

export const ProductDetails = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(productId);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Message variant="danger">
        {error?.data?.message || 'Error loading product details'}
      </Message>
    );
  }

  const scent = product.product;
  const quantitySelectOptions = generateQuantitySelectOptions(
    scent.countInStock
  );
  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
    navigate('/cart');
  };
  return (
    <>
      <Col>{scent.name}</Col>
      <Col>
        {scent.concentration} - Best for {scent.occasion}
      </Col>
      <Row>
        <Col xs={6} sm={6} md={3} lg={3} xl={3}>
          <img src={scent.image} alt={scent.name} />
        </Col>
        <Col xs={6} sm={6} md={3} lg={3} xl={3}>
          {scent.images &&
            scent.images.map((image, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={image}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      margin: '1rem',
                    }}
                  />
                </div>
              );
            })}
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{ width: '50%' }}>
          <Row style={{ border: '1px solid red' }}>
            <Col>
              <p>Top Notes</p>
              <Col>
                {scent.topNotes &&
                  scent.topNotes.map((note, index) => {
                    return <p key={index}>{note}</p>;
                  })}
              </Col>
            </Col>
            <Col>
              <p>Middle Notes</p>
              <Col>
                {scent.middleNotes &&
                  scent.middleNotes.map((note, index) => {
                    return <p key={index}>{note}</p>;
                  })}
              </Col>
            </Col>
            <Col>
              <p>Base Notes</p>
              <Col>
                {scent.baseNotes &&
                  scent.baseNotes.map((note, index) => {
                    return <p key={index}>{note}</p>;
                  })}
              </Col>
            </Col>
          </Row>

          <div>{scent.richDescription}</div>
          <Row>
            <Col>
              {scent.countInStock > 0
                ? `${scent.countInStock} left`
                : 'Out of Stock'}
            </Col>
            <Col>{scent.gender}</Col>
          </Row>
        </Col>
        <ListGroup.Item>
          <Button
            className="btn-block"
            type="button"
            disabled={scent.countInStock <= 0}
            onClick={addToCartHandler}
          >
            Add to Cart
          </Button>
        </ListGroup.Item>
        {scent.countInStock > 0 && (
          <ListGroup.Item>
            <Row>
              <Col>QTY</Col>
              <Col>
                <Form.Control
                  as="select"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {quantitySelectOptions}
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
        )}
      </Row>
    </>
  );
};
