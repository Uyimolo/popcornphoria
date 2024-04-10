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
      <h2>Checkout the hottest Movies and Tv Shows on the planet.</h2>

      {isNowPlayingSuccess && (
        <MovieCarousels
          movieData={nowPlayingData.results}
          type='movie'
          carouselTitle='Currently playing'
        />
      )}

      {isPopularSuccess && (
        <MovieCarousels
          movieData={popularData.results}
          type='movie'
          carouselTitle='Popular films'
        />
      )}

      {isOnAirSuccess && (
        <MovieCarousels
          movieData={onAirData.results}
          type='tv'
          carouselTitle='On air'
        />
      )}

      {isPopularTvSuccess && (
        <MovieCarousels
          movieData={popularTvData.results}
          type='tv'
          carouselTitle='Trending TV shows'
        />
      )}
    </div>
  );
};

export default Discover;
