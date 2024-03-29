import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice';
import filterReducer from '../features/filterSlice';
import authReducer from '../features/authSlice';
import toastReducer from '../features/toastSlice';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    filter: filterReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
