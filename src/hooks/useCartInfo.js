import { useSelector } from 'react-redux';

export const useCartItems = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return cartItems;
};

export const useShippingAddress = () => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  return shippingAddress;
};

export const usePaymentMethod = () => {
  const paymentMethod = useSelector((state) => state.cart.paymentMethod);

  return paymentMethod;
};

export const useCart = () => {
  const cart = useSelector((state) => state.cart);

  return cart;
};
