import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedin: false,
  //todo:set redirect route to the current route the user was before clicking on sign in. after successful sign in return them to that same route
  redirectRoute: '',
  userEmail: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateRedirectRoute: (state, action) => {
      state.redirectRoute = action.payload.redirectRoute;
    },
    signinUser: (state, action) => {
      state.isSignedin = true;
      state.userEmail = action.payload.email;
    },
  },
  signoutUser: (state) => {
    state = initialState;
  },
});

export const { updateRedirectRoute, signinUser, signoutUser } =
  authSlice.actions;

export default authSlice.reducer;
