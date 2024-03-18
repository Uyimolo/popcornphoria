import React from 'react';
import { useGetTrendingMoviesQuery } from '../features/apiSlice';

import MovieHeader from './MovieHeader';

const Trending = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetTrendingMoviesQuery();

  let headerContent;

  if (isSuccess) {
    const movieData = data.results[0];
    console.log(movieData);

    headerContent = <MovieHeader movieData={movieData} />;
  }

  return <div>{headerContent}</div>;
};

export default Trending;
