import { useState } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Col, Button, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Gender } from './Gender';
import { Season } from './Season';
import { Rating } from './Rating';

export const CardComponent = ({
  image,
  name,
  id,
  gender,
  season,
  rating,
  concentration,
  occasion,
  brand,
}) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="cardComp">
      <Row className="cardComp-heading d-flex align-items-center justify-content-center my-2">
        <Col className="cardComp__container-header" xs={9}>
          {name}
        </Col>
        <Col onClick={toggleLike} className="cardComp__like">
          {liked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </Col>
      </Row>

      <LinkContainer
        to={`/explore-scents/${id}`}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="cardComp__img-container"></div>
      </LinkContainer>

      <div className="cardComp__container">
        <Row className="cardComp__container-content align-items-center my-2">
          <Col className="cardComp__container-first" xs={3} lg={2}>
            <Season season={season} width="20px" />
          </Col>
          <Col className="cardComp__container-first" xs={3} lg={3}>
            <Gender gender={gender} width="30px" />
          </Col>
          <Col className="cardComp__concentration" xs={5} lg={6}>
            {concentration}
          </Col>
        </Row>
        <Rating value={rating} />
        <Col className="cardComp__container-first my-2">
          Best Occasion: {occasion}
        </Col>
        <Col className="cardComp__brand my-2">{brand}</Col>
      </div>
      <LinkContainer to={`/explore-scents/${id}`}>
        <Button className="w-100 my-1 third-button-alt">View details</Button>
      </LinkContainer>
    </div>
  );
};
