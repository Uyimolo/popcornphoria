import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBarsStaggered,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';
import { useLocation } from 'react-router';
import { useState } from 'react';
import HeaderSearchComponent from './HeaderSearchComponent';

const Header = ({
  isSidebarOpen,
  setIsSidebarOpen,
  showSearchInput,
  setShowSearchInput,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();
  return (
    <header>
      <Logo />

      <HeaderSearchComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

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
