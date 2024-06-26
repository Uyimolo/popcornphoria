import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const navigationContent = [
    { name: 'Home', to: '/' },
    { name: 'Browse movies', to: '/movie' },
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
    { name: 'Privacy', to: '/' },
    { name: 'Terms of service', to: '/' },
    { name: 'Built with TMDB API', to: '' },
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
            <Link key={link.name} to={link.to}>
              <p>{link.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className='footer-section'>
        <h3>Information</h3>

        <div className='footer-section-content'>
          {informationContent.map((link) => (
            <Link key={link.name} to={link.to}>
              <p>{link.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className='footer-section'>
        <h3>Legal</h3>

        <div className='footer-section-content'>
          {legalContent.map((link) =>
            !link.name === 'Built with TMDB API' ? (
              <Link key={link.name} to={link.to}>
                <p>{link.name}</p>
              </Link>
            ) : (
              <p key={link.name}>{link.name}</p>
            )
          )}
        </div>
      </div>

      <div className='footer-section'>
        <h3>Socials</h3>

        <div className='footer-section-content socials'>
          {socialMediaContent.map((link) => (
            <div key={link.name} className='social-link'>
              <Link to={link.to}>
                <FontAwesomeIcon className='awesome' icon={link.icon} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
