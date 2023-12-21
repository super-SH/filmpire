import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;
const tmdbToken = import.meta.env.VITE_TMDB_JWT;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbToken}`,
    },
  }),
  endpoints: (builder) => ({
    // GET Genres
    getGenres: builder.query({
      query: () => `/genre/movie/list`,
    }),
    //  GET movies by [Type]
    getMovies: builder.query({
      query: ({ categoryName, page, searchQuery }) => {
        // GET movie by Search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}`;
        }

        // GET movies by category
        if (categoryName && typeof categoryName === 'string') {
          return `/movie/${categoryName}?page=${page}`;
        }

        // GET movies by genre
        if (categoryName && typeof categoryName === 'number') {
          return `discover/movie?with_genres=${categoryName}&page=${page}`;
        }

        // GET popular movies
        return `/movie/popular?page=${page}`;
      },
    }),
    // GET a movie
    getMovie: builder.query({
      query: (id) => `movie/${id}?append_to_response=videos,credits`,
    }),

    // GET recommended movies
    getRecommendations: builder.query({
      query: ({ id, list }) => `/movie/${id}/${list}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} = tmdbApi;
