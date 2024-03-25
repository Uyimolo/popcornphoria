import React from 'react';
import { useGetAllTrendingQuery } from '../features/apiSlice';

import MovieHeader from './MovieHeader';

// Get the first movie in trending movies array and display it
const Trending = () => {
  const { data, isSuccess } = useGetAllTrendingQuery();

  return <div>{isSuccess && <MovieHeader movieData={data.results[0]} />}</div>;
};

export default Trending;
