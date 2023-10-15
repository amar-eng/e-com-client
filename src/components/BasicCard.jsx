import { Card, Button, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Rating } from './Rating';
import { useNavigate } from 'react-router-dom';

export const BasicCard = ({ name, occasion, rating, image, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/explore-scents/${id}`);
  };
  return (
    <Card className="custom-card">
      <Card.Img
        variant="top"
        src={image}
        className="card-img w-100"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{occasion}</Card.Text>
        <Row>
          <Rating value={rating} />
        </Row>

        <LinkContainer to={`/explore-scents/${id}`}>
          <Button className=" btn-prim my-3">Quick Shop</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};
