import { CATEGORIES_URL, PRODUCTS_URL } from '../../constants/endPoints';
import { apiSlice } from './apiSlice';
import { getTokenFromLocalStorage } from '../../utils/sliceUtils/userUtils';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: { pageNumber, keyword },
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
            'auth-token': token,
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
            'auth-token': token,
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

    uploadSingleImage: builder.mutation({
      query: (data) => {
        const token = getTokenFromLocalStorage();

        return {
          url: `${PRODUCTS_URL}/upload`,
          method: 'POST',
          body: data,
          headers: {
            'auth-token': token,
          },
        };
      },
    }),

    uploadMultipleImages: builder.mutation({
      query: (data) => {
        const token = getTokenFromLocalStorage();

        return {
          url: `${PRODUCTS_URL}/upload-images`,
          method: 'POST',
          body: data,
          headers: {
            'auth-token': token,
          },
        };
      },
    }),

    deleteProduct: builder.mutation({
      query: (productId) => {
        const token = getTokenFromLocalStorage();

        return {
          url: `${PRODUCTS_URL}/${productId}`,
          method: 'DELETE',
          headers: {
            'auth-token': token,
          },
        };
      },
      invalidatesTags: ['Product'],
    }),

    createReview: builder.mutation({
      query: (data) => {
        const token = getTokenFromLocalStorage();
        return {
          url: `${PRODUCTS_URL}/${data.productId}/reviews`,
          method: 'POST',
          body: data,
          headers: {
            'auth-token': token,
          },
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetCategoriesQuery,
  useUploadSingleImageMutation,
  useUploadMultipleImagesMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
} = productsApiSlice;
