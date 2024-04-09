import MovieCarousels from '../components/MovieCarousels';

import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetPopularTvShowsQuery,
  useGetTvOnTheAirQuery,
} from '../features/apiSlice';

const Discover = () => {
  const { data: nowPlayingData, isSuccess: isNowPlayingSuccess } =
    useGetNowPlayingMoviesQuery();

  const { data: popularData, isSuccess: isPopularSuccess } =
    useGetPopularMoviesQuery();

  const { data: onAirData, isSuccess: isOnAirSuccess } =
    useGetTvOnTheAirQuery();

  const { data: popularTvData, isSuccess: isPopularTvSuccess } =
    useGetPopularTvShowsQuery();

  return (
    <div className='page discover'>
      {isNowPlayingSuccess && (
        <MovieCarousels
          movieData={nowPlayingData.results}
          type='movie'
          carouselTitle='Now Playing'
        />
      )}

      {isPopularSuccess && (
        <MovieCarousels
          movieData={popularData.results}
          type='movie'
          carouselTitle='Popular movies'
        />
      )}

      {isOnAirSuccess && (
        <MovieCarousels
          movieData={onAirData.results}
          type='tv'
          carouselTitle='Currently on air'
        />
      )}

      {isPopularTvSuccess && (
        <MovieCarousels
          movieData={popularTvData.results}
          type='tv'
          carouselTitle='Popular TV shows'
        />
      )}
    </div>
  );
};

export default Discover;
