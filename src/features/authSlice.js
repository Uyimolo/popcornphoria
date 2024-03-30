import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedin: false,
  //todo:set redirect route to the current route the user was before clicking on sign in. after successful sign in return them to that same route
  redirectRoute: '/',
  userEmail: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateRedirectRoute: (state, action) => {
      state.redirectRoute = action.payload.redirectRoute;
    },
    setUserAuthState: (state, action) => {
      const { isSignedin, userEmail } = action.payload;
      state.isSignedin = isSignedin;
      state.userEmail = userEmail;
    },
  },
});

export const { updateRedirectRoute, setUserAuthState } = authSlice.actions;

export default authSlice.reducer;
