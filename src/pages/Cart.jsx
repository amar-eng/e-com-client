import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Message } from '../components/Message';
import { useDispatch } from 'react-redux';
import { useCartItems } from '../hooks/useCartInfo';
import { generateQuantitySelectOptions } from '../utils/common';
import { addToCart, removeFromCart } from '../services/slices/cartSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { useUserInfo } from '../hooks/useUserInfo';

export const Cart = ({ handleCloseModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useCartItems();
  const userInfo = useUserInfo();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=/checkout');
    }
  };

  const decrementQty = (item) => {
    if (item.qty > 1) {
      addToCartHandler(item, item.qty - 1);
    }
  };

  const incrementQty = (item) => {
    if (item.qty < item.product.countInStock) {
      addToCartHandler(item, item.qty + 1);
    }
  };

  return (
    <Row>
      <Col md={12}>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to="/explore-scents">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              if (item && item.product) {
                const quantitySelectOptions = generateQuantitySelectOptions(
                  item.product.countInStock
                );
                return (
                  <ListGroup.Item key={item.product._id}>
                    <Row>
                      <Col xs={3} md={2}>
                        <Link to={`/explore-scents/${item.product._id}`}>
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fluid
                            rounded
                          />
                        </Link>
                      </Col>

                      <Col xs={3} md={5}>
                        <Row className="cart__name">{item.product.name}</Row>
                        <Row className="cart__price">${item.product.price}</Row>
                      </Col>

                      <Col xs={6} md={5} className="d-flex align-items-center">
                        <Col className="scent__counter">
                          <Button
                            onClick={() => decrementQty(item)}
                            disabled={item.qty <= 1}
                            className="scent__btn"
                          >
                            -
                          </Button>

                          <div classame="scent__counter-num">{item.qty}</div>

                          <Button
                            onClick={() => incrementQty(item)}
                            disabled={item.qty >= item.product.countInStock}
                            className="scent__btn"
                          >
                            +
                          </Button>
                        </Col>
                        <Col md={2}>
                          <DeleteOutlinedIcon
                            onClick={() =>
                              removeFromCartHandler(item.product._id)
                            }
                            style={{ marginLeft: '0.5rem', fill: '#e02e2edb' }}
                          />
                        </Col>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              }
              return null;
            })}
          </ListGroup>
        )}

        <Row className="mt-4 mb-4 mx-1">
          <Col xs={9} md={9} className="cart__total">
            Total
          </Col>
          <Col className="cart__totalPrice">
            $
            {cartItems
              .filter((item) => item && item.product)
              .reduce((acc, item) => acc + item.qty * item.product.price, 0)
              .toFixed(2)}
          </Col>
        </Row>
        <Row className="mx-5" onClick={handleCloseModal}>
          <Button
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
            className="third-button "
          >
            Checkout
          </Button>
        </Row>
        <Row xs={1} xs={12}>
          <LinkContainer to="/explore-scents" onClick={handleCloseModal}>
            <div className="continue-shopping">
              <p className="continue-shopping--text">Continue Shopping</p>
            </div>
          </LinkContainer>
        </Row>
      </Col>
    </Row>
  );
};
