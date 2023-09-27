import { USERS_URL } from '../../constants/endPoints';
import { getTokenFromLocalStorage } from '../../utils/sliceUtils/userUtils';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation({
      query: ({ data, token }) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        headers: {
          'auth-token': token,
        },
        body: data,
      }),
    }),

    getUsers: builder.query({
      query: () => {
        const token = getTokenFromLocalStorage();
        return {
          url: `${USERS_URL}`,
          method: 'GET',
          headers: {
            'auth-token': token,
          },
        };
      },
      providesTags: [{ type: 'Users', id: 'LIST' }],
      keepUnusedDataFor: 5,
    }),

    deleteUser: builder.mutation({
      query: (userId) => {
        const token = getTokenFromLocalStorage();
        return {
          url: `${USERS_URL}/${userId}`,
          method: 'DELETE',
          headers: {
            'auth-token': token,
          },
        };
      },
    }),

    getUserDetails: builder.query({
      query: (userId) => {
        const token = getTokenFromLocalStorage();
        return {
          url: `${USERS_URL}/${userId}`,
          method: 'GET',
          headers: {
            'auth-token': token,
          },
        };
      },
      keepUnusedDataFor: 5,
    }),

    updateUser: builder.mutation({
      query: (data) => {
        const token = getTokenFromLocalStorage();

        return {
          url: `${USERS_URL}/${data.userId}`,
          method: 'PUT',
          body: data,
          headers: {
            'auth-token': token,
          },
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = usersApiSlice;
