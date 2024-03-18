import React from 'react';
import { useGetTrendingMoviesQuery } from '../features/apiSlice';

import MovieHeader from './MovieHeader';

// Get the first movie in trending movies array and display it
const Trending = () => {
  const { data, isSuccess } = useGetTrendingMoviesQuery();

  let headerContent;

  if (isSuccess) {
    const movieData = data.results[0];
    console.log(movieData);

    headerContent = <MovieHeader movieData={movieData} />;
  }

  return <div>{headerContent}</div>;
};

export default Trending;
