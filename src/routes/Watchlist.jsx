import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import LazyCarouselImage from '../components/LazyCarouselImage';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState(null);
  const authenticated = useSelector((state) => state.auth.isSignedin);
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
  }, []);

  return (
    <div className='page watchlist-page'>
      <h3>My watchlist</h3>
      {watchlist && watchlist.map((item) => <div key={item.id}>
        <LazyCarouselImage  poster_path={item.poster_path} />
        <div className="movie-details"></div>
      </div>)}
    </div>
  );
};

export default Watchlist;
