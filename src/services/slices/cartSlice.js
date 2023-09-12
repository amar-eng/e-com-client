import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../../utils/sliceUtils/cartUtils';
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Check if the item already exists in the cart
      const existItemIndex = state.cartItems.findIndex(
        (i) => i.product._id === item.product._id
      );

      if (existItemIndex !== -1) {
        // If the item exists, update its quantity
        state.cartItems[existItemIndex].qty = item.qty;
      } else {
        // If the item doesn't exist, add it to the cart
        state.cartItems.push(item);
      }

      return updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
