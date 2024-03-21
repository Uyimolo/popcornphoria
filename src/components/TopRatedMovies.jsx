import { register } from 'swiper/element/bundle';
import MovieHeader from './MovieHeader';
register();
const TopRatedMovies = ({ topRatedMovies }) => {
  return (
    <div>
      <swiper-container
        space-between='20'
        pagination='true'
        navigation='true'
        scroll-bar='true'
        speed='400'
        slides-per-view='1'
        per-slide-offset='0'
        breakpoints={JSON.stringify({
          640: {
            slidesPerView: 1.1,
            spaceBetween: 20,
          },
        })}>
        {topRatedMovies &&
          topRatedMovies.map((movie) => (
            <swiper-slide key={movie.id}>
              <div className='top-rated-slide'>
                <MovieHeader movieData={movie} type='movie' />
              </div>
            </swiper-slide>
          ))}
      </swiper-container>
    </div>
  );
};

export default TopRatedMovies;
