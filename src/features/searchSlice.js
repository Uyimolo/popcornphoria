import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchResults: [],
  showSearch: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchResults: (state, action) => {
      state.searchResults = action.payload.searchResults;
    },
    setShowSearch: (state) => {
      state.showSearch = !state.showSearch;
    },
  },
});

export const { updateSearchResults, setShowSearch } = searchSlice.actions;

export default searchSlice.reducer;
