import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const MovieHeader = ({ movieData, type }) => {
  // destructuring movieData
  const {
    poster_path,
    vote_average,
    vote_count,
    overview,
    media_type,
    id,
    release_date,
    first_air_date,
    name,
    title,
  } = movieData;

  const date = media_type === 'movie' ? release_date : first_air_date;
  const film_title = media_type === 'movie' ? title : name;

  return (
    <div className='movie-header'>
      <img
        src={`https://image.tmdb.org/t/p/w400${poster_path}`}
        alt={`${film_title}`}
        loading='lazy'
      />

      <div className='movie-info'>
        <h1>{film_title}</h1>

        <div className='miscellenous'>
          <FontAwesomeIcon icon={faStar} className='awesome' />
          <p className='rating'>{vote_average}</p>
          <p className='rating-count'>({vote_count})</p>
          <div className='seperation'></div>
          <p className='year'>{date.split('-')[0]}</p>
        </div>

        <p className='overview'>{overview}</p>

        <div className='cta'>
          <Link to={`/${media_type}/${id}`}>
            <button className='watch-trailer primary-btn'>Watch trailer</button>
          </Link>

          <button className='add-to-watchlist secondary-btn'>
            Add to watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieHeader;
