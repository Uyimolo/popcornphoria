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
      query: ({ page, ext }) => ({
        url: `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}${ext}&sort_by=popularity.desc&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getMovieDetail: builder.query({
      query: (id) => ({
        url: `movie/${id}?language=en-US&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getMovieVideos: builder.query({
      query: (id) => ({
        url: `movie/${id}/videos?language=en-US&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getSimilarMovies: builder.query({
      query: (id) => ({
        url: `movie/${id}/similar?language=en-US&page=1&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getMovieCredits: builder.query({
      query: (id) => ({
        url: `movie/${id}/credits?language=en-US&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getTvShows: builder.query({
      query: ({ page, ext }) => ({
        url: `discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}${ext}&sort_by=popularity.desc&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getTvShowDetail: builder.query({
      query: (id) => ({
        url: `tv/${id}?language=en-US&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getTvShowVideos: builder.query({
      query: (id) => ({
        url: `tv/${id}/videos?language=en-US&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getTvShowCredits: builder.query({
      query: (id) => ({
        url: `tv/${id}/credits?language=en-US&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getSimilarTvShows: builder.query({
      query: (id) => ({
        url: `tv/${id}/similar?language=en-US&page=1&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getAllTrending: builder.query({
      query: () => ({
        url: `trending/all/day?language=en-US&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getSearchResult: builder.query({
      query: (textToSearch) => ({
        url: `search/multi?query=${textToSearch}include_adult=false&language=en-US&page=1&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieDetailQuery,
  useGetMovieVideosQuery,
  useGetMovieCreditsQuery,
  useGetTvShowsQuery,
  useGetTvShowDetailQuery,
  useGetTvShowVideosQuery,
  useGetTvShowCreditsQuery,
  useGetSimilarTvShowsQuery,
  useGetAllTrendingQuery,
  useGetSimilarMoviesQuery,
  useGetSearchResultQuery
} = apiSlice;

export default apiSlice;
