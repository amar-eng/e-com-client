import { useState } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Col, Button, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Rating } from './Rating';

export const CardComponent = ({
  image,
  name,
  id,
  gender,
  season,
  concentration,
  occasion,
}) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="cardComp">
      <Row className="cardComp-heading d-flex align-items-center justify-content-center ">
        <Col className="cardComp__container-header" xs={9}>
          {name}
        </Col>
        <Col onClick={toggleLike} className="cardComp__like">
          {liked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </Col>
      </Row>

      <div className="cardComp__img-container">
        <img src={image} alt={name} className="cardComp__img" />
      </div>
      <div className="cardComp__container">
        <Row className="cardComp__container-content">
          <Col className="cardComp__container-first">{season}</Col>
          <Col className="cardComp__container-first">{gender}</Col>
        </Row>
        <Col className="cardComp__container-first">{occasion}</Col>
      </div>
      <LinkContainer to={`/explore-scents/${id}`}>
        <Button variant="secondary" className="w-100">
          Try It Out
        </Button>
      </LinkContainer>
    </div>
  );
};
