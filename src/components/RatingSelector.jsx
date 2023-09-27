import { useState } from 'react';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import IconButton from '@mui/material/IconButton';

const RatingSelector = ({ setRating }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRate = (value) => {
    setSelectedRating((prev) => {
      if (prev === value - 0.5) {
        return value;
      } else if (prev === value) {
        return value - 0.5;
      }
      return value;
    });

    setRating(value);
  };

  const getStarIcon = (value) => {
    if (selectedRating >= value) {
      return <StarRateIcon color="primary" />;
    } else if (selectedRating >= value - 0.5) {
      return <StarHalfOutlinedIcon color="primary" />;
    }
    return <StarBorderOutlinedIcon />;
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <IconButton onClick={() => handleRate(value)} key={value}>
          {getStarIcon(value)}
        </IconButton>
      ))}
    </div>
  );
};

export default RatingSelector;
