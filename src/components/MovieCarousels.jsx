import { register } from 'swiper/element/bundle';
register();

const MovieCarousels = ({ movieData, carouselTitle }) => {
  console.log(movieData);
  return (
    <div className='carousel-container'>
      <h3>{carouselTitle}</h3>
      <swiper-container
        className='carousel'
        space-between='10'
        slides-per-view='2.3'>
        {movieData.map((movie) => (
          <swiper-slide>
            <div className='carousel-tile'>
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=''
              />
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default MovieCarousels;
