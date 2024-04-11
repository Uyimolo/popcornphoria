import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import AddToWatchlist from './AddToWatchlist';
import { useEffect, useState } from 'react';

const MovieHeader = ({ movieData }) => {
  const [imagePath, setImagePath] = useState('');

  // destructuring movieData
  const {
    poster_path,
    backdrop_path,
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

  const isMobileDevice = () => {
    return window.matchMedia('(max-width: 1023px)').matches;
  };

  useEffect(() => {
    setImagePath(
      isMobileDevice()
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : `https://image.tmdb.org/t/p/w780${backdrop_path}`
    );
  }, [poster_path, backdrop_path]);

  return (
    <div className='movie-header'>
      <img
        className='header-image'
        src={`${imagePath}`}
        alt={`${imagePath && film_title}`}
      />

      <div className='movie-info'>
        <h1>{film_title}</h1>

        <div className='miscellenous'>
          <FontAwesomeIcon icon={faStar} className='awesome' />
          <p className='rating'>{vote_average.toFixed(1)}</p>
          <p className='rating-count'>({vote_count})</p>
          <div className='seperation'></div>
          <p className='year'>{date.split('-')[0]}</p>
        </div>

        <p className='overview'>{overview}</p>

        <div className='cta'>
          <Link to={`/${media_type}/${id}`}>
            <button>Watch trailer</button>
          </Link>

          <AddToWatchlist
            media_type={media_type}
            poster_path={poster_path}
            id={id}
            name={film_title}
            year={date.split('-')[0]}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieHeader;
