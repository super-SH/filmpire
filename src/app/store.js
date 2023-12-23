import { configureStore } from '@reduxjs/toolkit';

import { tmdbApi } from '../services/TMDB';

import categoryReducer from '../features/categorySlice';
import authReducer from '../features/authSlice';

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentCategory: categoryReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
export default store;
