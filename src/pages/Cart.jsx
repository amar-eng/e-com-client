import { Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Card,
  Button,
} from 'react-bootstrap';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Message } from '../components/Message';
import { useDispatch } from 'react-redux';
import { useCartItems } from '../hooks/useCartItems';
import { generateQuantitySelectOptions } from '../utils/common';
import { addToCart } from '../services/slices/cartSlice';
import { useState } from 'react';

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useCartItems();
  // const [qty, setQty] = useState(1);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Your Cart</h1>
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
                      <Col md={2}>
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product._id}`}>
                          {item.product.name}
                        </Link>
                      </Col>
                      <Col md={2}>${item.product.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) => {
                            addToCartHandler(item, Number(e.target.value));
                          }}
                        >
                          {quantitySelectOptions}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <DeleteOutlinedIcon
                          onClick={() => {
                            // Handle item removal from cart here
                          }}
                          style={{ color: '#e02e2edb' }}
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              }
              return null; // Add a null check to avoid rendering if item or item.product is undefined
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h3>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h3>
              $
              {cartItems
                .filter((item) => item && item.product) // Filter out undefined items
                .reduce((acc, item) => acc + item.qty * item.product.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                variant="warning"
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
