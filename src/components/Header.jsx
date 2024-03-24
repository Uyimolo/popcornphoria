import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faBarsStaggered, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header>
      <Link>
        <div className='logo'>
          <p>PopCorn</p>
          <p>Phoria</p>
        </div>
      </Link>

      <div className='search'>
        <input
          type='text'
          className='search-input'
          id='search-input'
          placeholder='Search'
        />
        {/* <img src={searchIcon} alt='search' className='search-icon' /> */}
        <FontAwesomeIcon className='search-icon awesome' icon={faSearch} />
      </div>

      <div
        className='menu-icons'
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {!isSidebarOpen && (
          // <img src={hamburgerIcon} alt='menu' className='menu-icon' />
          <FontAwesomeIcon icon={faBarsStaggered}  className='menu-icon awesome'/>
        )}
        {isSidebarOpen && (
          // <img src={closeIcon} alt='menu' className='menu-icon close-icon' />
          <FontAwesomeIcon icon={faClose} className='menu-icon close-icon awesome' />
        )}
      </div>
    </header>
  );
};

export default Header;
