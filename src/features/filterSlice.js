import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: {
    genre: '',
  },
  tvShows: {
    genre: '',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateGenre: (state, action) => {
      state[action.payload.category].genre = action.payload.genre;
    },
  },
});

export const { updateGenre } = filterSlice.actions;

export default filterSlice.reducer;
