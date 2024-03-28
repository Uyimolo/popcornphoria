import { Link } from 'react-router-dom';

const Logo = ({ click }) => {
  return (
    <Link to='/' className='logo' onClick={click}>
      <p>PopCorn</p>
      <p>Phoria</p>
    </Link>
  );
};

export default Logo;
