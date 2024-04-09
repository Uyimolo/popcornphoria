import { useState } from 'react';

import MovieListPagination from '../components/MovieListPagination';
import Genres from '../components/Genres';

import { useDispatch, useSelector } from 'react-redux';
import { updateGenre } from '../features/filterSlice';
import { useGetMoviesQuery } from '../features/apiSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

import { movieGenres } from '../assets/arraysAndObjects/movieGenres';

const Movies = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [showGenres, setShowGenres] = useState(false);

  const dispatch = useDispatch();
  const genre = useSelector((state) => state.filter.movies.genre);

  // add genres filter if genres is defined in state else fetch data without genres filter
  let movieGenre = genre ? `&with_genres=${genre}` : '';

  const { data: movies, isSuccess: moviesSuccess } = useGetMoviesQuery({
    page: pageNumber,
    ext: movieGenre,
  });

  let movieList = moviesSuccess ? movies.results : '';

  const handleFilterByGenre = (id) => {
    dispatch(updateGenre({ category: 'movies', genre: id }));
    setPageNumber(1);
    setShowGenres(false);
    window.scrollTo({ top: '10rem', behavior: 'smooth' });
  };

  const handleResetGenre = (isGenre) => {
    if (isGenre) {
      dispatch(updateGenre({ category: 'movies', genre: '' }));
      console.log(genre);
      setShowGenres(false);
    }
  };

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
      <Genres
        genre={genre}
        genresList={movieGenres}
        showGenres={showGenres}
        setShowGenres={setShowGenres}
        handleFilterByGenre={handleFilterByGenre}
        handleResetGenre={handleResetGenre}
        type='movies'
      />

      {movieList ? (
        <MovieListPagination movieList={movieList} type='movie' />
      ) : (
        <div className='spinner-center'>
          <FontAwesomeIcon className='awesome rotate ' icon={faSpinner} />
        </div>
      )}
      {movieList && (
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
              key={num}
              className={`pagination-number ${
                pageNumber === num ? 'active' : ''
              }`}
              onClick={() => handleNavigationPagination('number', num)}>
              {num}
            </p>
          ))}

          {pageNumber < 6 && (
            <FontAwesomeIcon
              icon={faArrowRight}
              color='white'
              className='previous'
              onClick={() => handleNavigationPagination('next')}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
