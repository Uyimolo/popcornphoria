import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase/config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessages } from '../assets/arraysAndObjects/errorMessages';
import { showToastAlert } from '../features/toastSlice';

const Login = () => {
  const redirectRoute = useSelector((state) => state.auth.redirectRoute);
  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        console.log(authState);
        navigate(redirectRoute);
        dispatch(showToastAlert({ type: 'success', message: `Welcome back` }));
      }
    } catch (error) {
      console.error(error.message);
      dispatch(
        showToastAlert({ type: 'error', message: errorMessages[error.code] })
      );
    }
  };

  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        dispatch(showToastAlert({ type: 'success', message: 'Welcome back' }));

        navigate(redirectRoute);
      }
    } catch (error) {
      console.error(error.message);
      dispatch(
        showToastAlert({ type: 'error', message: errorMessages[error.code] })
      );
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
          Don't have an account?
          <Link className='link' to='/signup'>
            Sign up now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
