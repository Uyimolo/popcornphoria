import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { showToastAlert } from '../features/toastSlice';
import { errorMessages } from '../assets/arraysAndObjects/errorMessages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faSignInAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const dispatch = useDispatch();
  const redirectRoute = useSelector((state) => state.auth.redirectRoute);

  const [signupData, setSignupData] = useState({ email: '', password: '' });
  const [passwordValidationReport, setPasswordValidationReport] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [googleIcon, setGoogleIcon] = useState(faGoogle);
  const [signupIcon, setSignupIcon] = useState(faSignInAlt);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
    // handle password strength and validation
    if (name === 'password') {
      checkPasswordStrengthAndValidation(value);
    }
    if (name === 'email') {
      emailValidation(value);
    }
  };

  const emailValidation = (email) => {
    const result = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
    setEmailValid(result);
  };

  const checkPasswordStrengthAndValidation = (password) => {
    const minLength = 6;
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const hasLetter = /[a-zA-Z]+/;
    const hasNumber = /[0-9]+/;

    // Check if the password meets the minimum length requirement
    if (password.length === 0) {
      setPasswordValidationReport('');
      setPasswordValid(false);
      return;
    }
    if (password.length < minLength) {
      setPasswordValidationReport(
        `Password should be at least ${minLength} characters`
      );
      setPasswordValid(false);
      return;
    }

    // Check for character complexity
    let complexityCount = 0;
    if (hasSymbol.test(password)) complexityCount++;
    if (hasLetter.test(password)) complexityCount++;
    if (hasNumber.test(password)) complexityCount++;

    // Provide feedback based on complexity count
    switch (complexityCount) {
      case 0:
        setPasswordValidationReport(
          'Password should contain letters, numbers, or symbols'
        );
        setPasswordValid(false);
        break;
      case 1:
        setPasswordValidationReport(
          'Password is weak, add symbols and numbers'
        );
        setPasswordValid(false);
        break;
      case 2:
        setPasswordValidationReport(
          'Password is moderate, consider adding symbols or numbers for added security'
        );
        setPasswordValid(true);
        break;
      case 3:
        setPasswordValidationReport('Password is strong');
        setPasswordValid(true);
        break;
      default:
        break;
    }
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    const { email, password } = signupData;
    if (passwordValid) {
      setSignupIcon(faSpinner);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (userCredential) {
          dispatch(
            showToastAlert({
              type: 'success',
              message: `Welcome to Popcornphoria`,
            })
          );

          navigate(redirectRoute);
        }
      } catch (error) {
        setSignupIcon(faSignInAlt);
        console.log(error);
        dispatch(
          showToastAlert({ type: 'error', message: errorMessages[error.code] })
        );
      }
    } else {
      dispatch(
        showToastAlert({
          type: 'error',
          message: 'Valid email and a strong password is required',
        })
      );
    }
  };

  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    try {
      setGoogleIcon(faSpinner);
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        dispatch(
          showToastAlert({
            type: 'success',
            message: `Welcome to Popcornphoria`,
          })
        );
        navigate(redirectRoute);
      }
    } catch (error) {
      setGoogleIcon(faGoogle);
      dispatch(
        showToastAlert({ type: 'error', message: errorMessages[error.code] })
      );
    }
  };

  const emailClass =
    signupData.email.length > 0 && emailValid
      ? 'valid'
      : signupData.email.length > 0 && !emailValid
      ? 'error'
      : '';

  const passwordClass =
    signupData.password.length > 0 && passwordValid
      ? 'valid'
      : signupData.password.length > 0 && !passwordValid
      ? 'error'
      : '';

  return (
    <div className='page signup-page'>
      <form action='' className='auth'>
        <h3>It's nice to see you.</h3>
        <label for='email'>Email</label>
        <input
          className={`email ${emailClass}`}
          id='email'
          type='text'
          placeholder='Enter email'
          name='email'
          value={signupData.email}
          onChange={handleChange}
        />
        {emailClass === 'error' && (
          <p className='valid-email'>
            Emails should be in this format lorem@ipsum.example
          </p>
        )}

        <label for='password'>Password</label>

        <input
          id='password'
          className={passwordClass}
          type='text'
          placeholder='Enter password'
          name='password'
          value={signupData.password}
          onChange={handleChange}
        />
        <p className='secure-password'>{passwordValidationReport}</p>
        <button onClick={handleEmailSignup} className='signup-button'>
          <FontAwesomeIcon
            className={`awesome ${signupIcon === faSpinner ? 'rotate' : ''}`}
            icon={signupIcon}
          />
          Sign up
        </button>
        <p className='or'>Or</p>
        <button
          onClick={handleGoogleSignup}
          className={`awesome googleIcon === faSpinner ? 'rotate' : ''}`}>
          <FontAwesomeIcon icon={googleIcon} />
          Sign up with Google
        </button>
        <p className='no-account'>
          Already have an account?{' '}
          <Link to='/login' className='link'>
            Sign in now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
