import { Link } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
register();

const MovieCarousels = ({ movieData, carouselTitle, type }) => {
  return (
    <div className='carousel-container'>
      <h3>{carouselTitle}</h3>
      <swiper-container
        className='carousel'
        space-between='10'
        slides-per-view='3.4'>
        {
          //show only movies with poster images becaue in details page if theres no trailer available i'll need to show the movie poster
          movieData
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <swiper-slide key={movie.id} lazy='true'>
                {/* conditionally set media type */}
                <Link to={`/${type ? type : movie.media_type}/${movie.id}`}>
                  <div className='carousel-tile'>
                    <img
                      loading='lazy'
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt=''
                    />
                  </div>
                </Link>
              </swiper-slide>
            ))
        }
      </swiper-container>
    </div>
  );
};

export default MovieCarousels;
