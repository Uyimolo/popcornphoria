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
