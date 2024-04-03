import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import WatchlistCard from '../components/WatchlistCard';
import { useNavigate } from 'react-router';
import { showToastAlert } from '../features/toastSlice';

const Watchlist = () => {
  const authenticated = useSelector((state) => state.auth.isSignedin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authenticated) {
      dispatch(
        showToastAlert({
          type: 'error',
          message: 'Please sign in to view watchlist',
        })
      );
      navigate('/');
    }
  }, [authenticated]);

  const [watchlist, setWatchlist] = useState(null);
  useEffect(() => {
    if (authenticated) {
      const userId = auth.currentUser?.uid;

      const watchlistRef = userId
        ? collection(db, 'users', userId, 'watchlist')
        : '';

      if (watchlistRef) {
        onSnapshot(watchlistRef, (snapshot) => {
          const fetchedWatchlist = snapshot.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
          }));
          setWatchlist(fetchedWatchlist);
        });
      }
    } else {
      return;
    }
  }, [watchlist, authenticated]);

  return (
    <div className='page watchlist-page'>
      <h3>My watchlist</h3>
      <div className='watchlist-card-container'>
        {!watchlist ? (
          <div className='spinner-center'>
            <FontAwesomeIcon className='awesome rotate' icon={faSpinner} />
          </div>
        ) : watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <WatchlistCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className='watchlist-placeholder'>No items in watchlist yet.</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
