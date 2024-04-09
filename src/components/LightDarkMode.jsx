import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { updateTheme } from '../features/themeSlice';
import { useEffect } from 'react';

const LightDarkMode = () => {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    const newTheme = mode === 'light' ? 'dark' : 'light';
    dispatch(updateTheme({ theme: newTheme }));
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className='light-dark-mode'>
      {mode !== 'light' ? (
        <FontAwesomeIcon
          icon={faSun}
          className='awesome sun'
          onClick={handleToggleTheme}
        />
      ) : (
        <FontAwesomeIcon
          icon={faMoon}
          className='awesome moon'
          onClick={handleToggleTheme}
        />
      )}
    </div>
  );
};

export default LightDarkMode;
