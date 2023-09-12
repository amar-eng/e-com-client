import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/slices/apiSlice';
import cartSliceReducer from './services/slices/cartSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
