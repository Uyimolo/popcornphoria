import React from 'react';
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = ({ isSidebarOpen }) => {
  const menuContent = [
    { name: 'Home', icon: faHome },
    { name: 'Movies', icon: faCamera },
    { name: 'TV Shows', icon: faTelevision },
  ];

  const libraryContent = [
    { name: 'Recent', icon: faClock },
    { name: 'Top Rated', icon: faStar },
    { name: 'WatchList', icon: faBookmark },
  ];

  const generalContent = [
    { name: 'Sign In', icon: faSignIn },
    { name: 'About', icon: faInfoCircle },
    { name: 'Contact', icon: faContactBook },
    { name: 'Settings', icon: faCogs },
    ,
    ,
  ];
  return (
    <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
      <div className='logo'>
        <p>PopCorn</p>
        <p>Phoria</p>
      </div>

      <div className='sidebar-section'>
        <p className='sidebar-section-heading'>Menu</p>
        <div className='sidebar-section-contents'>
          {menuContent.map((item) => (
            <div key={item.name} className='section-content'>
              <FontAwesomeIcon className='awesome' icon={item.icon} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='sidebar-section'>
        <p className='sidebar-section-heading'>Library</p>
        <div className='sidebar-section-contents'>
          {libraryContent.map((item) => (
            <div key={item.name} className='section-content'>
              <FontAwesomeIcon className='awesome' icon={item.icon} />
              <p className='sidebar-content-name'>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='sidebar-section'>
        <p className='sidebar-section-heading'>General</p>
        <div className='sidebar-section-contents'>
          {generalContent.map((item) => (
            <div key={item.name} className='section-content'>
              <FontAwesomeIcon className='awesome' icon={item.icon} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
