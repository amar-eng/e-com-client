import { ORDERS_URL, PAYPAL_URL } from '../../constants/endPoints';
import { getTokenFromLocalStorage } from '../../utils/sliceUtils/userUtils';
import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => {
        const token = getTokenFromLocalStorage();
        return {
          url: ORDERS_URL,
          method: 'POST',
          body: { ...order },
          headers: {
            'auth-token': token,
          },
        };
      },
    }),

    getOrderDetails: builder.query({
      query: (orderId) => {
        const token = getTokenFromLocalStorage();

        return {
          url: `${ORDERS_URL}/${orderId}`,
          headers: {
            'auth-token': token,
          },
        };
      },
      keepUnusedDataFor: 5,
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => {
        const token = getTokenFromLocalStorage();

        return {
          url: `${ORDERS_URL}/${orderId}/pay`,
          method: 'PUT',
          body: { ...details },
          headers: {
            'auth-token': token,
          },
        };
      },
    }),

    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    getMyOrders: builder.query({
      query: () => {
        const token = getTokenFromLocalStorage();
        return {
          url: `${ORDERS_URL}/my-orders`,
          headers: {
            'auth-token': token,
          },
        };
      },
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
      query: () => {
        const token = getTokenFromLocalStorage();
        return {
          url: ORDERS_URL,
          headers: {
            'auth-token': token,
          },
        };
      },
      keepUnusedDataFor: 5,
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => {
        const token = getTokenFromLocalStorage();

        return {
          url: `${ORDERS_URL}/${orderId}/deliver`,
          method: 'PUT',
          headers: {
            'auth-token': token,
          },
        };
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;
