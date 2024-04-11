import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import WatchlistCard from '../components/WatchlistCard';
import { useNavigate } from 'react-router-dom';

const Watchlist = () => {
  const authenticated = useSelector((state) => state.auth.isSignedin);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoading(true);
        const userId = user.uid;
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
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setWatchlist(null);
      }
    });

    return unsubscribe;
  }, [authenticated]);

  return (
    <div className='page watchlist-page'>
      <h2>My watchlist</h2>
      <div className='watchlist-card-container'>
        {loading ? (
          <div className='spinner-center'>
            <FontAwesomeIcon className='awesome rotate' icon={faSpinner} />
          </div>
        ) : !watchlist || watchlist.length < 1 ? (
          <p className='watchlist-placeholder'>{'Watchlist is empty'}</p>
        ) : (
          watchlist
            .sort((a, b) => b.date_added - a.date_added)
            .map((movie) => <WatchlistCard key={movie.id} movie={movie} />)
        )}
      </div>
      {!authenticated && !loading && (
        <div className='watchlist-error'>
          <p>Please sign in to view watchlist</p>
          <button onClick={() => navigate('/login')}>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
