import { useState } from 'react';
import {
  useGetTvShowsQuery,
  useGetCurrentlyPlayingTvShowsQuery,
} from '../features/apiSlice';
import MovieListPagination from '../components/MovieListPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import NowPlaying from '../components/NowPlaying';

const TvShows = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data: nowPlaying, isSuccess: nowPlayingSuccess } =
    useGetCurrentlyPlayingTvShowsQuery();

  let nowPlayingList;
  if (nowPlayingSuccess) {
    // console.log(topRatedMovies);
    nowPlayingList = nowPlaying.results;
  }

  const { data: movies, isSuccess: moviesSuccess } =
    useGetTvShowsQuery(pageNumber);
  console.log(movies);

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
        <NowPlaying nowPlaying={nowPlayingList} type='tv' />
      </div>

      <h3 className='padded-heading'>Tv shows</h3>

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
