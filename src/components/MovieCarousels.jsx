import { Link } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import LazyCarouselImage from './LazyCarouselImage';

register();

const MovieCarousels = ({ movieData, carouselTitle, type }) => {

  return (
    <div className='carousel-container'>
      <h3>{carouselTitle}</h3>
      <swiper-container
        preload={4}
        breakpoints={JSON.stringify({
          0: {
            slidesPerView: 3.4,
            spaceBetween: 10,
          },

          768: {
            slidesPerView: 4.4,
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
                  {/* <img
                    loading='lazy'
                    onLoad={handleImageLoad}
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={`${movie.title}`}
                  /> */}

                  <LazyCarouselImage
                    poster_path={movie.poster_path}
                    title={movie.title}
                  />
                </Link>
              </swiper-slide>
            ))
        }
      </swiper-container>
    </div>
  );
};

export default MovieCarousels;
