import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const navigationContent = [
    { name: 'Home', to: '/' },
    { name: 'Browse movies', to: '/movies' },
    { name: 'Browse TV shows', to: '/tv' },
    { name: 'Watchlist', to: '/watchlist' },
  ];

  const informationContent = [
    { name: 'Contact us', to: '/' },
    { name: 'Help center', to: '/' },
    { name: 'Press room', to: '/' },
    { name: 'Careers', to: '/' },
  ];

  const legalContent = [
    { name: 'Terms of service', to: '/' },
    { name: 'Privacy', to: '/' },
    { name: 'Copyright Notice', to: '/' },
  ];

  const socialMediaContent = [
    { name: 'Twitter', to: 'https://x.com/codeFrontline', icon: faTwitter },
    { name: 'Instagram', to: 'https://instagram.com', icon: faInstagram },
    { name: 'Facebook', to: 'https://facebook.com', icon: faFacebook },
  ];
  return (
    <footer className='footer'>
      <div className='footer-section'>
        <h3>Navigation</h3>

        <div className='footer-section-content'>
          {navigationContent.map((link) => (
            <Link to={link.to}>
              <p>{link.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className='footer-section'>
        <h3>Information</h3>

        <div className='footer-section-content'>
          {informationContent.map((link) => (
            <Link to={link.to}>
              <p>{link.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className='footer-section'>
        <h3>Legal</h3>

        <div className='footer-section-content'>
          {legalContent.map((link) => (
            <Link to={link.to}>
              <p>{link.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className='footer-section'>
        <h3>Built with</h3>
        <div className='footer-section-content'>
          <p>TMDB API</p>
          <p>React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
