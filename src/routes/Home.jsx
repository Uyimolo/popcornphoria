import {
  useGetAllTrendingQuery,
  useGetUpcomingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetPopularTvShowsQuery,
} from '../features/apiSlice';

import Trending from '../components/Trending';
import MovieCarousels from '../components/MovieCarousels';

const Home = () => {
  const { data: trendingData, isSuccess: isTrendingSuccess } =
    useGetAllTrendingQuery();
  let trendingContent;

  if (isTrendingSuccess) {
    const trending = trendingData.results;
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

  if (popularMoviesData) {
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
    <div>
      <Trending />
      <>{trendingContent}</>
      <> {upcomingContent}</>
      <>{popularMoviesContent}</>
      <>{popularTvsContent}</>
    </div>
  );
};

export default Home;
