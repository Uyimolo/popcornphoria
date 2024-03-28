import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className='page login-page'>
      <form action='' className='auth'>
        <h3>Nice to see you again.</h3>
        <input type='text' placeholder='Enter email' />
        <input type='text' placeholder='Enter password' />
        <p className='forgot-password'>Forgot password?</p>
        <button>Sign in</button>
        <p className='or'>Or</p>
        <button>Sign in with Google</button>
        <p className='no-account'>
          Don't have an account? <Link className="link" to="/signup">Sign up now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
