import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className='movie-card'>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='' />
      <p>{movie.title}</p>
    </Link>
  );
};

export default MovieCard;
