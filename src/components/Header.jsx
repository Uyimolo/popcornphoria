// import logo from '../assets/images/popcornphoria.png'
import searchIcon from '../assets/images/search.svg';
import hamburgerIcon from '../assets/images/hamburger-menu.svg'

import closeIcon from '../assets/images/close-menu.svg'
import { Link } from 'react-router-dom';

const Header = ({isSidebarOpen, setIsSidebarOpen}) => {
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
        <img src={searchIcon} alt='search' className='search-icon' />
      </div>

      <div
        className='menu-icons'
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {!isSidebarOpen && (
          <img src={hamburgerIcon} alt='menu' className='menu-icon' />
        )}
        {isSidebarOpen && (
          <img src={closeIcon} alt='menu' className='menu-icon close-icon' />
        )}
      </div>
    </header>
  );
};

export default Header;
