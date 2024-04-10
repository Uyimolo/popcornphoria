import { Link } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
// import LazyCarouselImage from './LazyCarouselImage';
import { Suspense, lazy } from 'react';
import FormattedDate from './FormattedDate';

const LazyCarouselImage = lazy(() => import('./LazyCarouselImage'));

register();

const MovieCarousels = ({ movieData, carouselTitle, type }) => {
  return (
    <div className='carousel-container' lazy='true' navigation='true'>
      <h3>{carouselTitle}</h3>
      <swiper-container
        breakpoints={JSON.stringify({
          0: {
            slidesPerView: 2.4,
            spaceBetween: 10,
          },

          768: {
            slidesPerView: 3.4,
            spaceBetween: 10,
            navigation: true,
          },
          1024: {
            slidesPerView: 6.4,
            spaceBetween: 10,
          },
        })}>
        {
          //show only movies with poster images because in details page if theres no trailer available i'll need to show the movie poster
          movieData
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <swiper-slide key={movie.id} lazy='true'>
                {/* conditionally set media type */}
                <Link to={`/${type ? type : movie.media_type}/${movie.id}`}>
                  <Suspense
                    fallback={<div className='lazy-carousel-image'> </div>}>
                    <div className='carousel-image-wrapper'>
                      <LazyCarouselImage
                        poster_path={movie.poster_path}
                        title={movie.title}
                      />
                      <p className='vote-average'>
                        {movie.vote_average === 0
                          ? 'NR'
                          : movie.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </Suspense>
                </Link>
                <p className='title'>{movie.name || movie.title}</p>
                <FormattedDate movie={movie} />
              </swiper-slide>
            ))
        }
      </swiper-container>
    </div>
  );
};

export default MovieCarousels;
