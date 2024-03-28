import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className='page signup-page'>
      <form action='' className='auth'>
        <h3>It's nice to see you.</h3>
        <input type='text' placeholder='Enter email' />
        <input type='text' placeholder='Enter password' />
        <p className='forgot-password'>Forgot password?</p>
        <button>Sign in</button>
        <p className='or'>Or</p>
        <button>Sign in with Google</button>
        <p className='no-account'>
          Already have an account? <Link to="/login">Sign in now</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
