export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.qty,
      0
    )
  );

  state.shippingPrice =
    state.itemsPrice > 100 ? 0 : addDecimals(0.15 * state.itemsPrice);

  state.taxPrice = addDecimals(0.13 * state.itemsPrice);

  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  );

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
