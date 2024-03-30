import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase/config';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  validatePassword,
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessages } from '../assets/arraysAndObjects/errorMessages';
import { showToastAlert } from '../features/toastSlice';

const Login = () => {
  const redirectRoute = useSelector((state) => state.auth.redirectRoute);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    // handle validations
    if (name === 'password') {
      handlePasswordValidation(value);
    }

    if (name === 'email') {
      handleEmailValidation(value);
    }
  };

  const handlePasswordValidation = (password) => {
    if (password.length < 6) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  const handleEmailValidation = (email) => {
    const result = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
    setEmailValid(result);
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;

    if (emailValid || passwordValid) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (userCredential) {
          dispatch(
            showToastAlert({ type: 'success', message: `Welcome back` })
          );
          navigate(redirectRoute);
        }
      } catch (error) {
        dispatch(
          showToastAlert({ type: 'error', message: errorMessages[error.code] })
        );
      }
    } else {
      dispatch(
        showToastAlert({
          type: 'error',
          message: 'Please add email and password information',
        })
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
      dispatch(
        showToastAlert({ type: 'error', message: errorMessages[error.code] })
      );
    }
  };

  const emailClass =
    loginData.email.length > 0 && emailValid
      ? 'valid'
      : loginData.email.length > 0 && !emailValid
      ? 'error'
      : '';

  const passwordClass =
    loginData.password.length > 0 && passwordValid
      ? 'valid'
      : loginData.password.length > 0 && !passwordValid
      ? 'error'
      : '';

  return (
    <div className='page login-page'>
      <form action='' className='auth'>
        <h3>It's nice to see you again.</h3>

        <label for='email'>Email</label>
        <input
          id='email'
          className={emailClass}
          type='text'
          placeholder='Enter email'
          name='email'
          value={loginData.email}
          onChange={handleChange}
        />
        {emailClass === 'error' && (
          <p className='valid-email'>
            Emails should be in this format lorem@ipsum.example
          </p>
        )}

        <label for='password'>Password</label>
        <input
          className={passwordClass}
          id='password'
          type='text'
          placeholder='Enter password'
          name='password'
          value={loginData.password}
          onChange={handleChange}
        />

        <p className='secure-password'>
          {passwordClass === 'error' &&
            !passwordValid &&
            'Passwords should be atleast 6 characters'}
        </p>

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
