import {
  useGetAllTrendingQuery,
  useGetUpcomingMoviesQuery,
} from '../features/apiSlice';

import Trending from '../components/Trending';
import MovieCarousels from '../components/MovieCarousels';

const Home = () => {
  const { data: trendingData, isSuccess: isTrendingSuccess } =
    useGetAllTrendingQuery();
  let trendingContent;

  if (isTrendingSuccess) {
    const trendingMovies = trendingData.results;
    trendingContent = (
      <MovieCarousels movieData={trendingMovies} carouselTitle='Trending now' />
    );
  }

  const { data: upcomingMoviesData, isSuccess: isUpcomingSuccess } =
    useGetUpcomingMoviesQuery();
  let upcomingContent;

  if (isUpcomingSuccess) {
    const upcomingMovies = upcomingMoviesData.results;
    upcomingContent = (
      <MovieCarousels movieData={upcomingMovies} carouselTitle='Coming soon' />
    );
  }

  return (
    <div>
      <Trending />
      <>{trendingContent}</>

      <> {upcomingContent}</>
    </div>
  );
};

export default Home;
