import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faBarsStaggered,
  faClose,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import Search from './Search';

const Header = ({
  isSidebarOpen,
  setIsSidebarOpen,
  showSearchInput,
  setShowSearchInput,
}) => {
  return (
    <header>
      <Link>
        <div className='logo'>
          <p>PopCorn</p>
          <p>Phoria</p>
        </div>
      </Link>

      <FontAwesomeIcon
        className='search-icon awesome'
        icon={faSearch}
        onClick={() => setShowSearchInput((prevState) => !prevState)}
      />

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
