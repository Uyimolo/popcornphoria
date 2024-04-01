import { useDispatch } from 'react-redux';
import { showToastAlert } from '../features/toastSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
const ShareMovie = ({ poster_path, link, name }) => {
  const dispatch = useDispatch();

  const handleShareMovie = useCallback(async () => {
    if (navigator.share) {
      try {
        const posterUrl = `https://image.tmdb.org/t/p/w200${poster_path}`;
        console.log(poster_path);

        const response = await fetch(posterUrl);
        console.log(response);
        // convert qrDataURL to blob
        const blob = await response.blob();
        const file = new File([blob], `${name}.png`, { type: 'image/png' });
        console.log(blob);
        console.log(file);
        await navigator.share({
          title: 'Have you watched this?',
          text: name,
          link: link,
          files: [file],
        });
        console.log(file);
      } catch (error) {
        console.error('Error sharing movie:', error);
        dispatch(
          showToastAlert({ type: 'error', message: 'Error sharing movie' })
        );
      }
    } else {
      // Fallback for browsers that do not support navigator.share
      dispatch(
        showToastAlert({
          type: 'error',
          message: 'Web Share API is not supported in this browser.',
        })
      );
    }
  }, []);

  return (
    <FontAwesomeIcon
      onClick={handleShareMovie}
      className='awesome'
      icon={faShareNodes}
    />
  );
};

export default ShareMovie;
