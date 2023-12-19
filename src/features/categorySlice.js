import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryName: '',
  page: 1,
  searchQuery: '',
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.categoryName = action.payload;
      state.searchQuery = '';
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectCategory, searchMovie } = categorySlice.actions;

export default categorySlice.reducer;
