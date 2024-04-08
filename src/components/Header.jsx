import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faClose } from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';
import { useState } from 'react';
import HeaderSearchComponent from './HeaderSearchComponent';
import Search from './Search';

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header>
      <Logo />

      <div className='search-wrapper'>
        <HeaderSearchComponent />

        {<Search />}
      </div>

      <div
        className='menu-icons'
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {!isSidebarOpen && (
          <FontAwesomeIcon
            icon={faBarsStaggered}
            className='menu-icon awesome'
          />
        )}

        {isSidebarOpen && (
          <FontAwesomeIcon
            icon={faClose}
            className='menu-icon close-icon awesome'
          />
        )}
      </div>
    </header>
  );
};

export default Header;
