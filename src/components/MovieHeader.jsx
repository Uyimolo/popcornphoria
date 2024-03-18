import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

const MovieHeader = ({ movieData }) => {
  return (
    <div className='movie-header'>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
        alt={`${movieData.title}`}
      />

      <div className='movie-info'>
        <h1>{movieData.title}</h1>
        <div className='miscellenous'>
          <FontAwesomeIcon icon={faStar} className='awesome' />
          <p className='rating'>{movieData.vote_average}</p>
          <p className='rating-count'>({movieData.vote_count})</p>
          <div className='seperation'></div>
          <p className='year'>{movieData.release_date.split('-')[0]}</p>
        </div>
        <p className='overview'>{movieData.overview}</p>

        <div className='cta'>
          <button className='watch-trailer primary-btn'>Watch trailer</button>
          <button className='add-to-watchlist secondary-btn'>
            Add to watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieHeader;
