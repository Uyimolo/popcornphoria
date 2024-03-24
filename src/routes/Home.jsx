import {
  useGetAllTrendingQuery,
  useGetUpcomingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetPopularTvShowsQuery,
} from '../features/apiSlice';

import Trending from '../components/Trending';
import MovieCarousels from '../components/MovieCarousels';

const Home = () => {
  const {
    data: trendingData,
    isSuccess: isTrendingSuccess,
    isLoading: isTrendingLoading,
  } = useGetAllTrendingQuery();
  let trendingContent;

  if (isTrendingSuccess) {
    // remove the first movie (already using the first movie in trending array as the Header movie for the page)
    const trending = trendingData.results.slice(1);
    trendingContent = (
      <MovieCarousels movieData={trending} carouselTitle='Trending now' />
    );
  }

  const { data: upcomingMoviesData, isSuccess: isUpcomingSuccess } =
    useGetUpcomingMoviesQuery();
  let upcomingContent;

  if (isUpcomingSuccess) {
    const upcomingMovies = upcomingMoviesData.results;
    upcomingContent = (
      <MovieCarousels
        movieData={upcomingMovies}
        carouselTitle='Upcoming movies'
        type='movie'
      />
    );
  }

  const { data: popularMoviesData, isSuccess: isPopularMoviesSuccess } =
    useGetPopularMoviesQuery();
  let popularMoviesContent;

  if (isPopularMoviesSuccess) {
    const popularMovies = popularMoviesData.results;
    popularMoviesContent = (
      <MovieCarousels
        movieData={popularMovies}
        carouselTitle='Popular Movies'
        type='movie'
      />
    );
  }

  const { data: popularTvsData, isSuccess: isPopularTvsSuccess } =
    useGetPopularTvShowsQuery();
  let popularTvsContent;

  if (isPopularTvsSuccess) {
    const popularTvs = popularTvsData.results;
    popularTvsContent = (
      <MovieCarousels
        movieData={popularTvs}
        carouselTitle='Popular TV shows'
        type='tv'
      />
    );
  }

  return (
    <div className='homepage'>
      {isTrendingLoading ? (
        <div className='header-placeholder'></div>
      ) : (
        <Trending />
      )}

      <div className='homepage-carousels'>
        <div>{trendingContent}</div>
        <div> {upcomingContent}</div>
        <div>{popularMoviesContent}</div>
        <div>{popularTvsContent}</div>
      </div>
    </div>
  );
};

export default Home;
