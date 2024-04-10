import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MovieCard = ({ movie, type }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { poster_path, title } = movie;

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setIsLoading(false);
    };
    image.src = `https://image.tmdb.org/t/p/w200${poster_path}`;
  }, [poster_path]);
  return (
    <Link to={`/${type}/${movie.id}`} className='movie-card'>
      {isLoading ? (
        <div className='lazy-carousel-image'></div>
      ) : (
        <div className='movie-card-inner-wrapper'>
          <img
            src={`https://image.tmdb.org/t/p/w200${poster_path}`}
            alt={`${title}`}
          />
          <p className='vote-average'>
            {movie.vote_average === 0 ? 'NR' : movie.vote_average.toFixed(1)}
          </p>
        </div>
      )}
    </Link>
  );
};

export default MovieCard;
