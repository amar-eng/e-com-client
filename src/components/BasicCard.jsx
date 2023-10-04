import { useState } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Card, Button, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Rating } from './Rating';

export const BasicCard = ({ name, occasion, rating, image, id }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <Card className="custom-card">
      <div onClick={toggleLike} className="custom-like">
        {liked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
      </div>
      <Card.Img variant="top" src={image} className="card-img" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {occasion}
          <Row>
            <Rating value={rating} />
          </Row>
        </Card.Text>

        <LinkContainer to={`/explore-scents/${id}`}>
          <Button variant="primary">Quick Shop</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};
