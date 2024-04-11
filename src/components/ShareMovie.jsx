import { useDispatch } from 'react-redux';
import { showToastAlert } from '../features/toastSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';

const ShareMovie = ({ name, link }) => {
  const dispatch = useDispatch();

  const handleShareMovie = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: name,
          text: `Check out ${name} on Popcornphoria!`,
          url: link,
        });
      } else {
        dispatch(
          showToastAlert({
            type: 'error',
            message: 'Web Share API is not supported in this browser.',
          })
        );
        throw new Error('Web Share API is not supported in this browser.');
      }
    } catch (error) {
      console.error('Error sharing movie:', error);
      dispatch(
        showToastAlert({ type: 'error', message: 'Failed to share movie.' })
      );
    }
  }, [dispatch, name, link]);

  return (
    <FontAwesomeIcon
      className='awesome share-icon'
      icon={faShare}
      onClick={handleShareMovie}
      title='Share'
    />
  );
};

export default ShareMovie;
