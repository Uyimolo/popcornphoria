import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBarsStaggered,
  faClose,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import Search from './Search';
import Logo from './Logo';
import { useLocation } from 'react-router';

const Header = ({
  isSidebarOpen,
  setIsSidebarOpen,
  showSearchInput,
  setShowSearchInput,
}) => {
  const location = useLocation();
  return (
    <header>
      <Logo />
      {!location.pathname.includes('/signup') &&
        !location.pathname.includes('/login') &&
        !isSidebarOpen && (
          <FontAwesomeIcon
            className='search-icon awesome'
            icon={faSearch}
            onClick={() => setShowSearchInput((prevState) => !prevState)}
          />
        )}

      <Search
        setShowSearchInput={setShowSearchInput}
        showSearchInput={showSearchInput}
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
