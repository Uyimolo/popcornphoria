import { useState } from 'react';
import { useGetTvShowsQuery } from '../features/apiSlice';
import MovieListPagination from '../components/MovieListPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { tvShowGenres } from '../assets/arraysAndObjects/tvShowGenres';
import { useDispatch, useSelector } from 'react-redux';
import { updateGenre } from '../features/filterSlice';

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
    window.scrollTo({ top: '10rem', behavior: 'smooth' });
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
      <div className='title_with_genres'>
        <h3 className=''>Tv shows </h3>
        <p onClick={() => setShowGenres((prevState) => !prevState)}>
          Filter by genre
        </p>
      </div>

      {showGenres && (
        <div className='filter-genres'>
          {genre && (
            <p
              className='reset-filter'
              onClick={() =>
                dispatch(updateGenre({ category: 'tvShows', genre: '' }))
              }>
              Reset filter
            </p>
          )}

          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setShowGenres(false)}
            className='awesome'
          />

          {tvShowGenres.map((genreOption) => (
            <p
              className={`filter-genre ${
                genre === genreOption.id ? 'active' : ''
              }`}
              key={genreOption.id}
              onClick={() => handleFilterByGenre(genreOption.id)}>
              {genreOption.name}
            </p>
          ))}
        </div>
      )}

      {tvShowsList && <MovieListPagination movieList={tvShowsList} type='tv' />}
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
    </div>
  );
};

export default TvShows;
