import React, { useState } from 'react';
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
import { deleteDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../firebase/config';
import { showToastAlert } from '../features/toastSlice';

const WatchlistCard = ({ movie }) => {
  const [deleteIcon, setDeleteIcon] = useState(faDumpster);
  const authenticated = useSelector((state) => state.auth.isSignedin);
  const dispatch = useDispatch();

  const timestamp = movie.date_added;
  const date = new Date(timestamp);

  // Get day, month, and year from the date object
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' }); // Get short month name
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}.`;

  const handleRemoveFromWatchlist = async (docId, name) => {
    setDeleteIcon(faSpinner);
    if (authenticated) {
      try {
        const userId = auth.currentUser.uid;
        const documentRef = doc(db, 'users', userId, 'watchlist', docId);
        await deleteDoc(documentRef);
        dispatch(
          showToastAlert({
            type: 'success',
            message: `${name} has been removed from your watchlist`,
          })
        );
      } catch {
        dispatch(
          showToastAlert({
            type: 'error',
            message: `Error deleting ${name} from watchlist`,
          })
        );
      }
    }
  };

  return (
    <div key={movie.docId} className='watchlist-movie-card'>
      <Link to={`/${movie.media_type}/${movie.id}`}>
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
            className={`awesome ${deleteIcon === faSpinner ? 'rotate' : ''}`}
            icon={deleteIcon}
            onClick={() => handleRemoveFromWatchlist(movie.docId, movie.name)}
          />
          <ShareMovie
            poster_path={movie.poster_path}
            link={`https://popcornphoria.vercel.app/${movie.media_type}/${movie.id}`}
            name={movie.name}
          />
        </div>
      </div>
    </div>
  );
};

export default WatchlistCard;
