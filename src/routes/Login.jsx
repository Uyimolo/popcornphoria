import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase/config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    try {
      const isSignedin = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (isSignedin) {
        console.log('signed in');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      const isGoogle = signInWithPopup(auth, googleProvider);
      if (isGoogle) navigate('/');
    } catch (error) {
      console.log(error);
      alert(error)
    }
  };

  return (
    <div className='page login-page'>
      <form action='' className='auth'>
        <h3>It's nice to see you again.</h3>
        <input
          type='text'
          placeholder='Enter email'
          name='email'
          value={loginData.email}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Enter password'
          name='password'
          value={loginData.password}
          onChange={handleChange}
        />
        <p className='forgot-password'>Forgot password?</p>
        <button onClick={handleSignin}>Sign in</button>
        <p className='or'>Or</p>
        <button onClick={handleGoogleSignin}>Sign in with Google</button>
        <p className='no-account'>
          Don't have an account?{' '}
          <Link className='link' to='/signup'>
            Sign up now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
