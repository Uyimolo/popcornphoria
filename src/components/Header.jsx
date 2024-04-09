import HeaderSearchComponent from './HeaderSearchComponent';
import LightDarkMode from './LightDarkMode';
import Logo from './Logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header>
      <div className='top-header'>
        <Logo />
        <div className='menu-icon-theme'>
          <LightDarkMode />
          {!isSidebarOpen && (
            <FontAwesomeIcon
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              icon={faBarsStaggered}
              className='menu-icon awesome'
            />
          )}
          <HeaderSearchComponent />
        </div>
      </div>
      <div className='search-wrapper'>
        <HeaderSearchComponent />
      </div>
    </header>
  );
};

export default Header;
