import { useState } from 'react';
import { Row, Col, Button, ListGroup, Form } from 'react-bootstrap';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../services/slices/productsApiSlice';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { addToCart } from '../services/slices/cartSlice';
import { useDispatch } from 'react-redux';
import {
  generateFormattedDate,
  generateQuantitySelectOptions,
} from '../utils/common';
import { toast } from 'react-toastify';
import { useUserInfo } from '../hooks/useUserInfo';
import { Rating } from '../components/Rating';
import RatingSelector from '../components/RatingSelector';
import { LinkContainer } from 'react-router-bootstrap';
import { GoBack } from '../components/GoBack';
import { ImageGallery } from '../components/ImageGallery';
import { Notes } from '../components/Notes';
import { Longevity } from '../components/Longevity';
import { Gender } from '../components/Gender';
import { Season } from '../components/Season';
import { CartModal } from '../layouts/CartModal';

export const ProductDetails = () => {
  const [showCartModal, setShowCartModal] = useState(false);

  const openCartModal = () => {
    setShowCartModal(true);
  };

  const closeCartModal = () => {
    setShowCartModal(false);
  };

  const { id: productId } = useParams();
  const dispatch = useDispatch();

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
      setQty(qty - 1);
    }
  };

  const incrementQty = () => {
    if (qty < scent.countInStock) {
      setQty(qty + 1);
    }
  };

  const scent = product.product;

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
    openCartModal();
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      toast.error('Please make sure to rate and write a comment');
      return;
    }

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
      if (error.message.includes('already reviewed')) {
        toast.error('Error, You already reviewed this!');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <GoBack to="/explore-scents" />

      <Row className="scent align-items-center mx-2 ">
        <Col md={3}>
          <div
            className="scent-img__container"
            style={{ backgroundImage: `url(${scent.image})` }}
          >
            {/* <img src={scent.image} alt={scent.name} className="scent__img" /> */}
          </div>
        </Col>
        <Col md={8}>
          <Col className="scent__featured">Best for {scent.occasion}</Col>
          <Col className="scent__name">{scent.name}</Col>
          <Col className="scent__desc">{scent.description}</Col>

          <Col className="mb-4">
            <p className="scent__featured">{scent.concentration}</p>
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

      <Row className="mt-5 mb-5 mx-2">
        <Col md={7}>
          <Notes {...scent} />
        </Col>
        <Col md={5}>
          <Col className="mb-3">
            <Longevity text="Longevity" value={scent.longevity} />
          </Col>

          <Row className="mb-3">
            <Gender {...scent} width="30px" />
            <Season {...scent} width="30px" />
          </Row>

          <Col>
            <Rating value={scent.rating} />
          </Col>
        </Col>
      </Row>
      <Row className="d-flex align-items-center mx-4">
        <Col md={4}>
          <h4>Tried {scent.name} before?</h4>
          {loadingProductreview && <Loader />}

          {userInfo ? (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="rating">
                <RatingSelector setRating={setRating} />
              </Form.Group>
              <Form.Group controlId="comment">
                <Form.Control
                  as="textarea"
                  row="3"
                  required
                  value={comment}
                  placeholder="Leave us with your thoughts"
                  onChange={(e) => setComment(e.target.value)}
                ></Form.Control>
                <Button
                  type="submit"
                  className="third-button mt-2"
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
        </Col>

        <Col md={8}>
          <ImageGallery {...scent} />
        </Col>
      </Row>

      <h1
        style={{ textAlign: 'center', margin: '4rem 0 ' }}
        className="scent__name"
      >
        Customer Reviews
      </h1>

      <Row className="mx-2">
        {scent.reviews.length === 0 && (
          <Col md={12}>
            <Message>No Reviews</Message>
          </Col>
        )}
        {scent.reviews.map((review, index) => (
          <Col md={6} className="mb-4" key={index}>
            <Row>
              <Col className="scent__reviewName">{review.name}</Col>
              <Col className="scent__date">
                {generateFormattedDate(review.datePosted)}
              </Col>
            </Row>
            <Row className="mb-3 mt-1">
              <Rating value={review.rating} />
            </Row>
            <p className="scent__comment">{review.comment}</p>
          </Col>
        ))}
      </Row>

      <CartModal showModal={showCartModal} handleCloseModal={closeCartModal} />
    </>
  );
};
