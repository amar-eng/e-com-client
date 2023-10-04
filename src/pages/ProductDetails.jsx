import { useState } from 'react';
import { Row, Col, Button, ListGroup, Form } from 'react-bootstrap';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../services/slices/productsApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { addToCart } from '../services/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { generateQuantitySelectOptions } from '../utils/common';
import { toast } from 'react-toastify';
import { useUserInfo } from '../hooks/useUserInfo';
import { Rating } from '../components/Rating';
import RatingSelector from '../components/RatingSelector';
import { LinkContainer } from 'react-router-bootstrap';
import { GoBack } from '../components/GoBack';

export const ProductDetails = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductreview }] =
    useCreateReviewMutation();

  const userInfo = useUserInfo();

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

  const decrementQty = () => {
    if (qty > 1) {
      // assuming you don't want to go below 1
      setQty(qty - 1);
    }
  };

  const incrementQty = () => {
    if (qty < scent.countInStock) {
      setQty(qty + 1);
    }
  };

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

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();

      refetch();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
    } catch (error) {
      toast.error('Error, product already reviewed');
    }
  };
  return (
    <>
      <GoBack to="/explore-scents" />

      <Row className="scent">
        <Col md={4}>
          <img src={scent.image} alt={scent.name} className="scent__img" />
        </Col>
        <Col md={8}>
          <Col className="scent__featured">Best for {scent.occasion}</Col>
          <Col className="scent__name">{scent.name}</Col>
          <Col className="scent__desc">{scent.description}</Col>

          <Col className="mb-4">
            <Row>
              <Col>{scent.concentration}</Col>
              <Col>{scent.gender}</Col>
              <Col>{scent.season}</Col>
            </Row>
          </Col>
          <Col className="scent__price">${scent.price}</Col>
          <Row className="scent__bottom">
            <div className="scent__counter">
              <Button
                onClick={decrementQty}
                disabled={qty <= 1}
                className="scent__btn"
              >
                -
              </Button>

              <div>{qty}</div>

              <Button
                onClick={incrementQty}
                disabled={qty >= scent.countInStock}
                className="scent__btn"
              >
                +
              </Button>
            </div>
            <Col>
              <Button
                className="third-button"
                type="button"
                disabled={scent.countInStock <= 0}
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* <Col>{scent.name}</Col>
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
          <Rating value={scent.rating} />
          <div>{scent.rating}</div>
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
      <Row>
        <Row className="review">
          <Col md={6}>
            <h2>Reviews</h2>
            {scent.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant="flush">
              {scent.reviews.map((review) => (
                <ListGroup.Item key={review.id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.datePosted}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}

              <ListGroup.Item>
                <h2>Write a review</h2>
                {loadingProductreview && <Loader />}

                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <RatingSelector setRating={setRating} />
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loadingProductreview}
                      >
                        Submit
                      </Button>
                    </Form.Group>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to="/login">sign in</Link> to write a review
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Row> */}
    </>
  );
};
