import { Link } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
register();

const MovieCarousels = ({ movieData, carouselTitle, type }) => {
  return (
    <div className='carousel-container'>
      <h3>{carouselTitle}</h3>
      <swiper-container
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
          //show only movies with poster images becaue in details page if theres no trailer available i'll need to show the movie poster
          movieData
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <swiper-slide key={movie.id} lazy='true'>
                {/* conditionally set media type */}
                <Link to={`/${type ? type : movie.media_type}/${movie.id}`}>
                  <img
                    loading='lazy'
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title}`}
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
