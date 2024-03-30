import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toastType: '',
  toastMessage: '',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToastAlert: (state, action) => {
      state.toastType = action.payload.type;
      state.toastMessage = action.payload.message;
    },
    removeToast: (state, action) => {
      state.toastType = '';
      state.toastMessage = '';
    },
  },
});

export const { showToastAlert, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
