import Trending from '../components/Trending';
import MovieCarousels from '../components/MovieCarousels';

import { useGetAllTrendingQuery } from '../features/apiSlice';

const Home = () => {
  // handle all queries
  const {
    data: trendingData,
    isSuccess: isTrendingSuccess,
    isLoading: isTrendingLoading,
  } = useGetAllTrendingQuery();

  return (
    <div className='homepage'>
      <div className="welcome-message">
        <h1>Welcome.</h1>
        <h2>Millions of movies, TV shows await your discovery.  Explore now.</h2>
      </div>

      {isTrendingLoading ? (
        <div className='header-placeholder'></div>
      ) : (
        <Trending />
      )}

      <div className='homepage-carousels'>
        {isTrendingSuccess && (
          <MovieCarousels
            movieData={trendingData.results.slice(1)}
            carouselTitle='Trending now'
          />
        )}
      </div>
    </div>
  );
};

export default Home;
