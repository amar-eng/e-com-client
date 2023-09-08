import { useState } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import { heroImage } from '../utils/lists';
import { Buttons } from './Buttons';
import { Row } from 'react-bootstrap';

export const BasicCard = ({ scentName, subheader, ratings }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="card-container">
      <div onClick={toggleLike} className="card-container__like">
        {liked ? (
          <FavoriteIcon className="card-container__like-button" />
        ) : (
          <FavoriteBorderOutlinedIcon className="card-container__like-button" />
        )}
      </div>
      <div className="card-content">
        <img
          src={heroImage}
          alt="best-colognes"
          className="card-content__img"
        />
        <div className="card-content__texts">
          <p>{scentName}</p>
          <p>{subheader}</p>
          <Row>
            <StarBorderOutlinedIcon />
            <StarHalfOutlinedIcon />
            <StarRateIcon />
          </Row>
        </div>

        <Buttons text="view details" />
      </div>
    </div>
  );
};
