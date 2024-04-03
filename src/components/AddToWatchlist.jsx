import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { showToastAlert } from '../features/toastSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

const AddToWatchlist = ({ poster_path, id, media_type, name, year }) => {
  const dispatch = useDispatch();
  const online = useSelector((state) => state.auth.isSignedin);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [buttonIcon, setButtonIcon] = useState(faSpinner);

  useEffect(() => {
    checkWatchlist();
  }, [media_type, online, poster_path, isInWatchlist]);

  const checkWatchlist = async () => {
    setButtonIcon(faSpinner);
    if (!online) {
      setButtonIcon(faPlus);

      return;
    }

    const userId = auth.currentUser.uid;
    const watchlistRef = collection(db, 'users', userId, 'watchlist');
    const q = query(
      watchlistRef,
      where('id', '==', id),
      where('media_type', '==', media_type)
    );

    const querySnapshot = await getDocs(q);
    setIsInWatchlist(!querySnapshot.empty);
    if (isInWatchlist) {
      setButtonIcon(faCheck);
    }
    if (!isInWatchlist) {
      // alert('not in watchlist');
      setButtonIcon(faPlus);
    }
    // console.log('Is in watchlist:', !querySnapshot.empty);
  };

  const handleAddToWatchlist = async () => {
    if (!online) {
      dispatch(
        showToastAlert({
          type: 'error',
          message: 'Please sign in to add items to your watchlist',
        })
      );
      return;
    }

    checkWatchlist();

    const userId = auth.currentUser.uid;

    const collectionRef = collection(db, 'users', userId, 'watchlist');
    const data = {
      media_type,
      poster_path,
      id,
      date_added: Date.now(),
      name,
      year,
    };

    try {
      setButtonIcon(faSpinner);
      const isSuccess = await addDoc(collectionRef, data);
      if (isSuccess)
        dispatch(
          showToastAlert({
            type: 'success',
            message: `${name} has been added to your watchlist`,
          })
        );
      setButtonIcon(faCheck);
    } catch (error) {
      console.error('Error uploading document to Firestore:', error);
      dispatch(
        showToastAlert({ type: 'error', message: 'Could not add to watchlist' })
      );
    }
  };

  return (
    <button
      className={`add-to-watchlist-button`}
      onClick={handleAddToWatchlist}
      disabled={isInWatchlist}>
      <FontAwesomeIcon
        className={`awesome ${buttonIcon === faSpinner ? 'rotate' : ''}`}
        icon={buttonIcon}
      />{' '}
      {'Watchlist'}
    </button>
  );
};

export default AddToWatchlist;
