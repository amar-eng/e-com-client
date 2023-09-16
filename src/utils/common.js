export const generateQuantitySelectOptions = (countInStock) => {
  const options = [...Array(countInStock).keys()].map((x) => (
    <option key={x + 1} value={x + 1}>
      {x + 1}
    </option>
  ));

  return options;
};

export const generateFormattedDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    'en-US',
    options
  );
  return formattedDate;
};
