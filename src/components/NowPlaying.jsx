import { register } from 'swiper/element/bundle';
import MovieHeader from './MovieHeader';
register();
const NowPlaying = ({ nowPlaying, type }) => {
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
        {nowPlaying &&
          nowPlaying.map((movie) => (
            <swiper-slide key={movie.id}>
              <div className='top-rated-slide'>
                <MovieHeader movieData={movie} type={type} />
              </div>
            </swiper-slide>
          ))}
      </swiper-container>
    </div>
  );
};

export default NowPlaying;
