import { Card, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Rating } from './Rating';
import { useNavigate } from 'react-router-dom';
import { Gender } from './Gender';
import { Season } from './Season';

export const BasicCard = ({
  name,
  concentration,
  rating,
  image,
  id,
  gender,
  season,
}) => {
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
        <Card.Title className="basic-card__title">{name}</Card.Title>
        <Card.Text className="basic-card__text">{concentration}</Card.Text>

        <Row className="d-flex align-items-center justify-content-center mt-2">
          <Col xs={2}>
            <Gender gender={gender} width="25px" />
          </Col>
          <Col xs={2}>
            <Season season={season} width="25px" />
          </Col>
          <Col>
            <Rating value={rating} />
          </Col>
        </Row>

        <LinkContainer to={`/explore-scents/${id}`}>
          <Button className=" btn-prim my-3">Quick Shop</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};
