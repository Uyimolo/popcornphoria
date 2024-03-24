import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice';
import filterReducer from '../features/filterSlice';

export const store = configureStore({
  reducer: { filter: filterReducer, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
