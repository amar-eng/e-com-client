export const generateQuantitySelectOptions = (countInStock) => {
  const options = [...Array(countInStock).keys()].map((x) => (
    <option key={x + 1} value={x + 1}>
      {x + 1}
    </option>
  ));

  return options;
};
