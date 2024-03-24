import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateGenre } from '../features/filterSlice';

import {
  useGetCurrentlyPlayingMoviesQuery,
  useGetMoviesQuery,
} from '../features/apiSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import NowPlaying from '../components/NowPlaying';
import MovieListPagination from '../components/MovieListPagination';
import { movieGenres } from '../assets/arraysAndObjects/movieGenres';

const Movies = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [showGenres, setShowGenres] = useState(false);

  const dispatch = useDispatch();
  const genre = useSelector((state) => state.filter.movies.genre);

  const { data: nowPlaying, isSuccess: nowPlayingSuccess, isLoading: isNowPlayingLoading } =
    useGetCurrentlyPlayingMoviesQuery();

  let nowPlayingList = nowPlayingSuccess ? nowPlaying.results : '';

  // add genres filter if genres is defined in state else fetch data without genres filter
  let movieGenre = genre ? `&with_genres=${genre}` : '';

  const { data: movies, isSuccess: moviesSuccess } = useGetMoviesQuery({
    page: pageNumber,
    ext: movieGenre,
  });

  let movieList = moviesSuccess ? movies.results : '';

  const handleFilterByGenre = (id) => {
    dispatch(updateGenre({ category: 'movies', genre: id }));
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
      <div className='topRated-movies'>
        {isNowPlayingLoading ? <div className='lazy-header-image'></div> :<NowPlaying nowPlaying={nowPlayingList} type='movie' />}
      </div>

      <div className='title_with_genres'>
        <h3 className=''>Movies </h3>
        <p onClick={() => setShowGenres((prevState) => !prevState)}>
          Filter by genre
        </p>
      </div>

      {showGenres && (
        <div className='filter-genres'>
          {genre && (
            <p className='reset-filter' onClick={() => setGenre('')}>
              Reset filter
            </p>
          )}

          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setShowGenres(false)}
            className='awesome'
          />

          {movieGenres.map((genreOption) => (
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

      {movieList && <MovieListPagination movieList={movieList} type='movie' />}
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

export default Movies;
