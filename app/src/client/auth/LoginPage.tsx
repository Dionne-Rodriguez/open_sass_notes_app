import { useAuth, LoginForm, SignupForm } from 'wasp/client/auth';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthWrapper } from './authWrapper';

export default function Login() {
  const [signUp, setSignUp] = useState(0);
  const history = useHistory();
  const { data: user } = useAuth();

  const shouldShowLogIn = signUp === 0

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  //Needs to be made more error-proof, currently clicking either sign up or login links will cause this to change state, leaving room for issues. Should be more validated/specific.
  const handleClick = () => setSignUp(signUp === 0 ? 1 : 0);

  //component that used to be the login page, shows login form and text
  const LogInView = () => (
      <div>
        <LoginForm />
        <br />
       <span className='text-sm font-medium text-gray-900 dark:text-gray-900'>
        Don't have an account yet?{' '}
        <a onClick={handleClick} className='underline'>
          go to signup
        </a>
    .
       </span>
      <br />
    <span className='text-sm font-medium text-gray-900'>
    Forgot your password?{' '}
    <Link to='/request-password-reset' className='underline'>
      reset it
    </Link>
    .
  </span>
  </div>
  )

  //component that used to be the login page, shows login form and text
  const SignUpView = () => ( 
    <div>
      <SignupForm />
      <br />
      <span className='text-sm font-medium text-gray-900'>
        I already have an account (
        <a onClick={handleClick} className='underline'>
          go to login
        </a>
        ).
      </span>
      <br />
      </div> 
  )

  return (
    <AuthWrapper>
      { shouldShowLogIn ? 
        <LogInView/> :<SignUpView/>
      }
    </AuthWrapper>
  );
}
