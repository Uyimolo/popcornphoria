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
      query: (pageNumber) => ({
        url: `discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getPopularMovies: builder.query({
      query: () => ({
        url: `movie/popular?language=en-US&page=1&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getCurrentlyPlayingMovies: builder.query({
      query: () => ({
        url: `movie/now_playing?language=en-US&page=1&api_key=${tmdbApiKey}`,
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
      query: (pageNumber) => ({
        url: `discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getCurrentlyPlayingTvShows: builder.query({
      query: () => ({
        url: `tv/airing_today?language=en-US&page=1&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),

    getPopularTvShows: builder.query({
      query: () => ({
        url: `tv/popular?language=en-US&page=1&api_key=${tmdbApiKey}`,
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

    getUpcomingMovies: builder.query({
      query: () => ({
        url: `movie/upcoming?language=en-US&page=1&api_key=${tmdbApiKey}`,
        options: tmdbOptions,
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieDetailQuery,
  useGetPopularMoviesQuery,
  useGetCurrentlyPlayingMoviesQuery,
  useGetMovieVideosQuery,
  useGetMovieCreditsQuery,
  useGetTvShowsQuery,
  useGetCurrentlyPlayingTvShowsQuery,
  useGetTvShowDetailQuery,
  useGetPopularTvShowsQuery,
  useGetTvShowVideosQuery,
  useGetTvShowCreditsQuery,
  useGetSimilarTvShowsQuery,
  useGetAllTrendingQuery,
  useGetUpcomingMoviesQuery,
  useGetSimilarMoviesQuery,
} = apiSlice;

export default apiSlice;
