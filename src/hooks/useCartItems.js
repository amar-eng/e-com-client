import { useSelector } from 'react-redux';

export const useCartItems = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return cartItems;
};
