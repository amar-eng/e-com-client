import { CATEGORIES_URL, PRODUCTS_URL } from '../../constants/endPoints';
import { apiSlice } from './apiSlice';
import { getTokenFromLocalStorage } from '../../utils/sliceUtils/userUtils';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: () => {
        const token = getTokenFromLocalStorage();

        return {
          url: `${PRODUCTS_URL}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: (data) => {
        const token = getTokenFromLocalStorage();

        return {
          url: `${PRODUCTS_URL}/${data.productId}`,
          method: 'PUT',
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['Product'],
    }),

    getCategories: builder.query({
      query: () => ({
        url: CATEGORIES_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetCategoriesQuery,
} = productsApiSlice;
