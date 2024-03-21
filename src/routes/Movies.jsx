import { useState } from 'react';
import TopRatedMovies from '../components/TopRatedMovies';
import { useGetTopRatedMoviesQuery } from '../features/apiSlice';
import MovieListPagination from '../components/MovieListPagination';

const Movies = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data: topRatedMovies, isSuccess: topRatedSuccess } =
    useGetTopRatedMoviesQuery();

  let topRatedMoviesList;
  if (topRatedSuccess) {
    // console.log(topRatedMovies)
    topRatedMoviesList = topRatedMovies.results;
  }

  const { data: movies, isSuccess: moviesSuccess } =
    useGetTopRatedMoviesQuery(pageNumber);

  let movieList;
  if (topRatedSuccess) {
    // console.log(topRatedMovies)
    movieList = movies.results;
  }

  return (
    <div className='movie page'>
      <div className='topRated-movies'>
        <TopRatedMovies topRatedMovies={topRatedMoviesList} />
      </div>
      <MovieListPagination movieList={movieList} />
    </div>
  );
};

export default Movies;
