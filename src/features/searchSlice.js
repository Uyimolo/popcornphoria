import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
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
    setShowSearch: (state, action) => {
      state.showSearch = action.payload.showSearch;
    },
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload.searchTerm;
    },
  },
});

export const { updateSearchResults, setShowSearch, updateSearchTerm } =
  searchSlice.actions;

export default searchSlice.reducer;
