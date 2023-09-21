import jwtDecode from 'jwt-decode';

export const generateQuantitySelectOptions = (countInStock) => {
  const options = [...Array(countInStock).keys()].map((x) => (
    <option key={x + 1} value={x + 1}>
      {x + 1}
    </option>
  ));

  return options;
};

export const generateFormattedDate = (dateString) => {
  if (!dateString) return 'Invalid Date';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return 'Invalid Date';

  return date.toISOString().split('T')[0];
};

export const maskedId = (id) => {
  return `***${id.slice(-4)}`;
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (e) {
    return true;
  }
};
