import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import LazyCarouselImage from '../components/LazyCarouselImage';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumpster } from '@fortawesome/free-solid-svg-icons';
import ShareMovie from '../components/ShareMovie';
import { deleteDoc, doc } from 'firebase/firestore';

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
  }, []);

  const handleRemoveFromWatchlist = async (docId) => {
    if (authenticated) {
      const userId = auth.currentUser.uid;

      const documentRef = doc(db, 'users', userId, 'watchlist', docId);
      const isDeleted = await deleteDoc(documentRef);
      if (isDeleted) alert('deleted');
    }
  };

  return (
    <div className='page watchlist-page'>
      <h3>My watchlist</h3>
      <div className='watchlist-card-container'>
        {watchlist ? (
          watchlist.map((item) => (
            <div key={item.id} className='watchlist-movie-card'>
              <Link to={`/${item.media_type}/${item.id}`}>
                <LazyCarouselImage poster_path={item.poster_path} />
              </Link>
              <div className='actions'>
                <FontAwesomeIcon
                  className='awesome'
                  icon={faDumpster}
                  onClick={() => handleRemoveFromWatchlist(item.docId)}
                />
                <ShareMovie
                  poster_path={item.poster_path}
                  link={`https://localhost:5173/${item.media_type}/${item.id}`}
                  name={item.name}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Watchlist is empty</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
