import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  faHome,
  faCamera,
  faTelevision,
  faClock,
  faStar,
  faBookmark,
  faSignIn,
  faSignOut,
  faCogs,
  faContactBook,
  faInfoCircle,
  faDisplay,
  faPerson,
  faPersonBurst,
} from '@fortawesome/free-solid-svg-icons';

import Logo from './Logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { updateRedirectRoute } from '../features/authSlice';
import { signOut } from 'firebase/auth';
import { showToastAlert } from '../features/toastSlice';
import { auth } from '../firebase/config';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, setShowSearchInput }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const online = useSelector((state) => state.auth.isSignedin);
  const user = useSelector((state) => state.auth.userEmail);

  const menuContent = [
    { name: 'Home', icon: faHome, to: '/' },
    { name: 'Browse Movies', icon: faCamera, to: '/movie' },
    { name: 'Browse TV Shows', icon: faTelevision, to: '/tv' },
  ];

  const libraryContent = [
    { name: 'Recent', icon: faClock, to: '' },
    { name: 'Top Rated', icon: faStar, to: '' },
    { name: 'Watchlist', icon: faBookmark, to: '/watchlist' },
  ];

  const generalContent = [
    {
      name: `${online ? 'Sign Out' : 'Sign In'}`,
      icon: online ? faSignOut : faSignIn,
      to: '/',
    },
    { name: 'About', icon: faInfoCircle, to: '' },
    { name: 'Contact', icon: faContactBook, to: '' },
    { name: 'Settings', icon: faCogs, to: '' },
  ];

  // close all modals that may be obstructing the new routes display
  const handleDisplayRoute = async (name) => {
    if (name === 'Sign In') {
      const currentPath = location.pathname;
      dispatch(updateRedirectRoute({ redirectRoute: currentPath }));

      navigate('/login');
    } else if (name === 'Sign Out') {
      await signOut(auth);

      dispatch(
        showToastAlert({
          type: 'success',
          message: 'You have been signed out.',
        })
      );
    }
    setShowSearchInput(false);
    setIsSidebarOpen(false);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
      <Logo click={handleDisplayRoute} />

      {online && (
        <div className='profile'>
          <p>{user[0].toUpperCase()}</p>
        </div>
      )}

      <div className='sidebar-section'>
        <p className='sidebar-section-heading'>Menu</p>
        <div className='sidebar-section-contents'>
          {menuContent.map((item) => (
            <Link
              onClick={handleDisplayRoute}
              key={item.name}
              to={item.to}
              className='section-content'>
              <FontAwesomeIcon className='awesome' icon={item.icon} />
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className='sidebar-section'>
        <p className='sidebar-section-heading'>Library</p>
        <div className='sidebar-section-contents'>
          {libraryContent.map((item) => (
            <Link
              onClick={handleDisplayRoute}
              key={item.name}
              to={item.to}
              className='section-content'>
              <FontAwesomeIcon className='awesome' icon={item.icon} />
              <p className='sidebar-content-name'>{item.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className='sidebar-section'>
        <p className='sidebar-section-heading'>General</p>
        <div className='sidebar-section-contents'>
          {generalContent.map((item) =>
            item.name === 'Sign In' ? (
              // can't render Sign in as a Link because I'll programmatically be changing routes
              <div
                onClick={() => handleDisplayRoute(item.name)}
                key={item.name}
                className='section-content'>
                <FontAwesomeIcon className='awesome' icon={item.icon} />
                <p>{item.name}</p>
              </div>
            ) : item.name === 'Sign Out' ? (
              // can't render Sign in as a Link because I'll programmatically be changing routes
              <div
                onClick={() => handleDisplayRoute(item.name)}
                key={item.name}
                className='section-content'>
                <FontAwesomeIcon className='awesome' icon={item.icon} />
                <p>{item.name}</p>
              </div>
            ) : (
              <Link
                onClick={() => handleDisplayRoute(item.name)}
                key={item.name}
                to={item.to}
                className='section-content'>
                <FontAwesomeIcon className='awesome' icon={item.icon} />
                <p>{item.name}</p>
              </Link>
            )
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
