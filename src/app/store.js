import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice';
import filterReducer from '../features/filterSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
