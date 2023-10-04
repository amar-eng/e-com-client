import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';

export const Rating = ({ value }) => {
  const getStarIcon = (index) => {
    const roundedValue = Math.ceil(value * 2) / 2;

    if (roundedValue >= index) {
      return <StarRateIcon style={{ fill: '#0a2345' }} />;
    } else if (roundedValue >= index - 0.5 && roundedValue < index) {
      return <StarHalfOutlinedIcon style={{ fill: '#0a2345' }} />;
    } else {
      return <StarBorderOutlinedIcon style={{ fill: '#0a2345' }} />;
    }
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index}>{getStarIcon(index)}</span>
      ))}
    </div>
  );
};
