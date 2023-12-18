import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;
const tmdbToken = import.meta.env.VITE_TMDB_JWT;

const page = 1;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbApiKey}`,
    },
  }),
  endpoints: (builder) => ({
    //  GET movies by [Type]
    getMovies: builder.query({
      query: () => `/movie/popular?page=${page}`,
    }),
  }),
});

export const { useGetMoviesQuery } = tmdbApi;
