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

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, setShowSearchInput }) => {
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
    ,
    ,
  ];
  // close all modals that may be obstructing the new routes display
  const handleDisplayRoute = () => {
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
          {generalContent.map((item) => (
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
    </aside>
  );
};

export default Sidebar;
