import { useState } from 'react';
import { useGetTvShowsQuery } from '../features/apiSlice';
import MovieListPagination from '../components/MovieListPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

import { tvShowGenres } from '../assets/arraysAndObjects/tvShowGenres';
import { useDispatch, useSelector } from 'react-redux';
import { updateGenre } from '../features/filterSlice';
import Genres from '../components/Genres';

const TvShows = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [showGenres, setShowGenres] = useState(false);

  const dispatch = useDispatch();
  const genre = useSelector((state) => state.filter.tvShows.genre);

  let tvGenre = genre ? `&with_genres=${genre}` : '';

  const { data: tvShows, isSuccess: tvShowsSuccess } = useGetTvShowsQuery({
    page: pageNumber,
    ext: tvGenre,
  });

  const tvShowsList = tvShowsSuccess ? tvShows.results : '';

  const handleFilterByGenre = (id) => {
    dispatch(updateGenre({ category: 'tvShows', genre: id }));
    setPageNumber(1);
    setShowGenres((prevState) => !prevState);
    // window.scrollTo({ top: '10rem', behavior: 'smooth' });
  };

  const handleResetGenre = () => {
    dispatch(updateGenre({ category: 'tvShows', genre: '' }));
    setShowGenres(false);
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
        genresList={tvShowGenres}
        setShowGenres={setShowGenres}
        showGenres={showGenres}
        handleFilterByGenre={handleFilterByGenre}
        handleResetGenre={handleResetGenre}
        type='tv shows'
      />

      {tvShowsList ? (
        <MovieListPagination movieList={tvShowsList} type='tv' />
      ) : (
        <div className='spinner-center'>
          <FontAwesomeIcon className='awesome rotate ' icon={faSpinner} />
        </div>
      )}
      {tvShowsList && (
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

export default TvShows;
