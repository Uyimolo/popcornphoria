import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  faHome,
  faTelevision,
  faClock,
  faStar,
  faBookmark,
  faSignIn,
  faSignOut,
  faCogs,
  faContactBook,
  faInfoCircle,
  faShieldAlt,
  faFilm,
  faNewspaper,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';

import Logo from './Logo';

import { updateRedirectRoute } from '../features/authSlice';
import { signOut } from 'firebase/auth';
import { showToastAlert } from '../features/toastSlice';
import { auth } from '../firebase/config';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import SidebarSection from './SidebarSection';
import {
  setShowSearch,
  updateSearchResults,
  updateSearchTerm,
} from '../features/searchSlice';

import displayPictureWhite from '../assets/images/dp_white.svg';
import displayPicture from '../assets/images/dp.svg';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, setShowSearchInput }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const online = useSelector((state) => state.auth.isSignedin);
  const theme = useSelector((state) => state.theme.mode);

  const menuContent = [
    { name: 'Home', icon: faHome, to: '/' },
    { name: 'Explore Movies', icon: faFilm, to: '/movie' },
    { name: 'Explore TV Shows', icon: faTelevision, to: '/tv' },
    { name: 'My Watchlist', icon: faBookmark, to: '/watchlist' },
    { name: 'Discover', icon: faClock, to: '/discover' },
  ];

  const libraryContent = [{ name: 'Top Rated', icon: faStar, to: '' }];

  const generalContent = [
    {
      name: `${online ? 'Sign Out' : 'Sign In'}`,
      icon: online ? faSignOut : faSignIn,
      to: '/',
    },
    { name: 'About', icon: faInfoCircle, to: '' },
    { name: 'Contact', icon: faContactBook, to: '' },
    { name: 'Settings', icon: faCogs, to: '' },
  ];

  const informationContent = [
    { name: 'Privacy', to: '', icon: faShieldAlt },
    { name: 'Contact us', to: '', icon: faContactBook },
    { name: 'Help center', to: '', icon: faInfoCircle },
    { name: 'Press room', to: '', icon: faNewspaper },
    { name: 'Careers', to: '', icon: faBriefcase },
  ];

  const socialMediaContent = [
    { name: 'Twitter', to: 'https://x.com/codeFrontline', icon: faTwitter },
    { name: 'Instagram', to: 'https://instagram.com', icon: faInstagram },
    { name: 'Facebook', to: 'https://facebook.com', icon: faFacebook },
  ];

  // close all modals that may be obstructing the new routes display
  const handleDisplayRoute = async (name) => {
    if (name === 'Sign In') {
      const currentPath = location.pathname;
      dispatch(updateRedirectRoute({ redirectRoute: currentPath }));

      navigate('/login');
    } else if (name === 'Sign Out') {
      await signOut(auth);

      dispatch(
        showToastAlert({
          type: 'success',
          message: 'You have been signed out.',
        })
      );
    }
    setShowSearchInput(false);
    setIsSidebarOpen(false);
    dispatch(setShowSearch({ showSearch: false }));
    dispatch(updateSearchResults({ searchResults: [] }));
    dispatch(updateSearchTerm({ searchTerm: '' }));
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
      <Logo click={handleDisplayRoute} />
      <div className='logo'></div>
      {online && (
        <div className='user-profile'>
          <img
            src={theme === 'light' ? displayPicture : displayPictureWhite}
            alt=''
            className='profile-image awesome'
          />
          <p>{auth.currentUser?.email.split('@')[0].toUpperCase()}</p>
        </div>
      )}
      <div className='sidebar-content-wrapper'>
        <SidebarSection
          sectionHeading='Menu'
          content={menuContent}
          handleDisplayRoute={handleDisplayRoute}
        />

        <SidebarSection
          sectionHeading='Library'
          content={libraryContent}
          handleDisplayRoute={handleDisplayRoute}
        />

        <SidebarSection
          sectionHeading='General'
          content={generalContent}
          handleDisplayRoute={handleDisplayRoute}
        />

        <SidebarSection
          sectionHeading='information'
          content={informationContent}
          handleDisplayRoute={handleDisplayRoute}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
