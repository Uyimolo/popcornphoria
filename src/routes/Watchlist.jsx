import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import WatchlistCard from '../components/WatchlistCard';

const Watchlist = () => {
  const authenticated = useSelector((state) => state.auth.isSignedin);

  const [watchlist, setWatchlist] = useState(null);
  useEffect(() => {
    if (authenticated) {
      const userId = auth.currentUser.uid;

      const watchlistRef = collection(db, 'users', userId, 'watchlist');

      onSnapshot(watchlistRef, (snapshot) => {
        const fetchedWatchlist = snapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        setWatchlist(fetchedWatchlist);
      });
    }
  }, [watchlist, authenticated]);

  const handleRemoveFromWatchlist = async (docId) => {
    if (authenticated) {
      const userId = auth.currentUser.uid;

      const documentRef = doc(db, 'users', userId, 'watchlist', docId);
      const isDeleted = await deleteDoc(documentRef);
      if (isDeleted) alert('deleted');
    }
  };

  const getDate = (milliseconds) => {
    console.log(milliseconds);
    return new Date(milliseconds);
  };

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
            <WatchlistCard
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              movie={movie}
            />
          ))
        ) : (
          <p className='watchlist-placeholder'>No items in watchlist yet.</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
