import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faClose } from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';
import { useState } from 'react';
import HeaderSearchComponent from './HeaderSearchComponent';
import Search from './Search';

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);

  return (
    <header>
      <Logo />

      <div className='search-wrapper'>
        <HeaderSearchComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setShowSearchResult={setShowSearchResult}
          showSearchResult={showSearchResult}
        />

        {
          <Search
            showSearchResult={showSearchResult}
            setShowSearchResult={setShowSearchResult}
          />
        }
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
