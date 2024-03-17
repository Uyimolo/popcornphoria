import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// hide api key with .env files
const tmdbApiKey = process.env.TMDB_API_KEY;

const tmdbOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => ({
        url: `discover/movie?include_adult=true&include_video=true&language=en-US&page=1&sort_by=primary_release_date.desc&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),
    getMovieDetail: builder.query({
      query: (id) => ({
        url: `movie/${id}?language=en-US&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),
    getTrendingMovies: builder.query({
      query: () => ({
        url: `trending/movie/day?language=en-US&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),
    getTvShows: builder.query({
      query: () => ({
        url: `genre/tv/list?include_adult=true&include_video=true&language=en-US&page=1&sort_by=primary_release_date.desc&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),
    getTvShowDetail: builder.query({
      query: (id) => ({
        url: `tv/${id}?language=en-US&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),
    getTrendingTvShows: builder.query({
      query: () => ({
        url: `trending/tv/day?language=en-US&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieDetailQuery,
  useGetTrendingMoviesQuery,
  useGetTvShowsQuery,
  useGetTvShowDetailQuery,
  useGetTrendingTvShowsQuery,
} = apiSlice;

export default apiSlice;
