import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Signup = () => {
  const [signupData, setSignupData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    const { email, password } = signupData;
    try {
      const isSignedUp = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (isSignedUp) {
        // create logic to return user to initial page where he was before with redux
        navigate('/');
      }
      // setup elaborate error messages and toastify like alerts and input specific validations
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    try {
     const isGoogle = await signInWithPopup(auth, googleProvider);
     if(isGoogle) navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='page signup-page'>
      <form action='' className='auth'>
        <h3>It's nice to see you.</h3>
        <input
          type='text'
          placeholder='Enter email'
          name='email'
          value={signupData.email}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Enter password'
          name='password'
          value={signupData.password}
          onChange={handleChange}
        />
        <p className='secure-password'>Use a secure password!</p>
        <button onClick={handleEmailSignup} className='signup-button'>
          Sign up
        </button>
        <p className='or'>Or</p>
        <button onClick={handleGoogleSignup}>Sign up with Google</button>
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
