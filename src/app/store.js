import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice';
import filterReducer from '../features/filterSlice';
import authReducer from '../features/authSlice';
import toastReducer from '../features/toastSlice';
import searchReducer from '../features/searchSlice';
import themeReducer from '../features/themeSlice';
export const store = configureStore({
  reducer: {
    toast: toastReducer,
    filter: filterReducer,
    search: searchReducer,
    auth: authReducer,
    theme: themeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
