import React from 'react';
import { Link } from 'react-router-dom';
import LazyCarouselImage from './LazyCarouselImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faCrown,
  faDumpster,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import ShareMovie from '../components/ShareMovie';
import LazyWatchlistImage from './LazyWatchlistImage';

const WatchlistCard = ({ movie, handleRemoveFromWatchlist }) => {
  const timestamp = movie.date_added;
  const date = new Date(timestamp);

  // Get day, month, and year from the date object
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' }); // Get short month name
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}.`;
  return (
    <div key={movie.docId} className='watchlist-movie-card'>
      <Link to={`/${movie.media_type}/${movie.id}`}>
        {/* <LazyCarouselImage poster_path={movie.poster_path} /> */}
        <LazyWatchlistImage poster_path={movie.poster_path} />
      </Link>
      <div className='details'>
        <div className='text'>
          <p>
            <span>Title:</span> {movie.name}
          </p>
          <p>
            <span>Release date:</span> {movie.year}
          </p>
          <p>
            <span>Date added:</span> {formattedDate}
          </p>
        </div>

        <div className='actions'>
          <FontAwesomeIcon
            className='awesome'
            icon={faDumpster}
            onClick={() => handleRemoveFromWatchlist(movie.docId)}
          />
          <ShareMovie
            poster_path={movie.poster_path}
            link={`https://localhost:5173/${movie.media_type}/${movie.id}`}
            name={movie.name}
          />
        </div>
      </div>
    </div>
  );
};

export default WatchlistCard;
