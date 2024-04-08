import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

const Logo = ({ click }) => {
  return (
    <Link to='/' className='logo' onClick={click}>
      <img src={logo} alt='popcornphoria' />
      <div className='text'>
        <p>PopCorn</p>
        <p>Phoria</p>
      </div>
    </Link>
  );
};

export default Logo;
