import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  faHome,
  faCamera,
  faTelevision,
  faClock,
  faStar,
  faBookmark,
  faSignIn,
  faCogs,
  faContactBook,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

import Logo from './Logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { updateRedirectRoute } from '../features/authSlice';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, setShowSearchInput }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuContent = [
    { name: 'Home', icon: faHome, to: '/' },
    { name: 'Movies', icon: faCamera, to: '/movie' },
    { name: 'TV Shows', icon: faTelevision, to: '/tv' },
  ];

  const libraryContent = [
    { name: 'Recent', icon: faClock, to: '' },
    { name: 'Top Rated', icon: faStar, to: '' },
    { name: 'WatchList', icon: faBookmark, to: '' },
  ];

  const generalContent = [
    { name: 'Sign In', icon: faSignIn, to: '/login' },
    { name: 'About', icon: faInfoCircle, to: '' },
    { name: 'Contact', icon: faContactBook, to: '' },
    { name: 'Settings', icon: faCogs, to: '' },
  ];

  // close all modals that may be obstructing the new routes display
  const handleDisplayRoute = (name) => {
    if (name === 'Sign In') {
      const currentPath = location.pathname;
      dispatch(updateRedirectRoute({ redirectRoute: currentPath }));
      handleDisplayRoute();
      navigate('/login');
    }
    setShowSearchInput(false);
    setIsSidebarOpen(false);
  };
  return (
    <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
      <Logo click={handleDisplayRoute} />

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
            item.name !== 'Sign In' ? (
              <Link
                onClick={() => handleDisplayRoute(item.name)}
                key={item.name}
                to={item.to}
                className='section-content'>
                <FontAwesomeIcon className='awesome' icon={item.icon} />
                <p>{item.name}</p>
              </Link>
            ) : (
              // can't render Sign in as a Link because I'll programmatically be changing routes
              <div
                onClick={() => handleDisplayRoute(item.name)}
                key={item.name}
                to={item.to}
                className='section-content'>
                <FontAwesomeIcon className='awesome' icon={item.icon} />
                <p>{item.name}</p>
              </div>
            )
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
