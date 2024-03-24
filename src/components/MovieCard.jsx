import { Link } from 'react-router-dom';

const MovieCard = ({ movie, type }) => {
  return (
    <Link to={`/${type}/${movie.id}`} className='movie-card'>
      <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt='' />
      <p>{movie.title}</p>
    </Link>
  );
};

export default MovieCard;
