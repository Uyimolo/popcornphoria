import { useState } from 'react';
import TopRatedMovies from '../components/TopRatedMovies';
import {
  useGetMoviesQuery,
  useGetTopRatedMoviesQuery,
} from '../features/apiSlice';
import MovieListPagination from '../components/MovieListPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Movies = () => {
  const [pageNumber, setPageNumber] = useState(3);

  const { data: topRatedMovies, isSuccess: topRatedSuccess } =
    useGetTopRatedMoviesQuery();

  let topRatedMoviesList;
  if (topRatedSuccess) {
    topRatedMoviesList = topRatedMovies.results;
  }

  const { data: movies, isSuccess: moviesSuccess } =
    useGetMoviesQuery(pageNumber);

  let movieList;
  if (moviesSuccess) {
    movieList = movies.results;
  }

  const handleNavigationPagination = (mode, value) => {
    mode === 'next'
      ? setPageNumber((prevNum) => prevNum + 1)
      : mode === 'previous'
      ? setPageNumber((prevNum) => prevNum - 1)
      : setPageNumber(value);
    //note: calculate the start of movie grid and scroll there
    window.scrollTo({ top: '10rem', behavior: 'smooth' });
  };

  return (
    <div className='movie'>
      <div className='topRated-movies'>
        <TopRatedMovies topRatedMovies={topRatedMoviesList} />
      </div>
      {movieList && <MovieListPagination movieList={movieList} />}
      <div className='pagination-scroll'></div>
      <div className='pagination-navigation'>
        {pageNumber > 1 && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            color='white'
            className='previous'
            onClick={() => handleNavigationPagination('previous')}
          />
        )}

        {[1, 2, 3, 4, 5, 6].map((num) => (
          <p
            className={`pagination-number ${
              pageNumber === num ? 'active' : ''
            }`}
            onClick={() => handleNavigationPagination('number', num)}>
            {num}
          </p>
        ))}

        {pageNumber < 7 && (
          <FontAwesomeIcon
            icon={faArrowRight}
            color='white'
            className='previous'
            onClick={() => handleNavigationPagination('next')}
          />
        )}
      </div>
    </div>
  );
};

export default Movies;
