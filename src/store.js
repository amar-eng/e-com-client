import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/slices/apiSlice';
import cartSliceReducer from './services/slices/cartSlice';
import authSliceReducer from './services/slices/authSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
