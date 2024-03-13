import '../index.css';
import logo from '../assets/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useState } from 'react';
import axios from 'axios';
import SignUpForm from '../components/SignUpForm';

//this file has been moved to unused folder, if using it, make sure to fix the routes in main.wasp
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUp, setSignUp] = useState(0);
  const navigate = useNavigate();

  const authenticate = () => {
    const credentials = {
      username: username,
      password: password,
    };

    if(signUp===0){
    axios.post('http://localhost:8420/v1/login', credentials).then((resp) => {
      console.log(resp);
      if (resp.status == 200) {
        localStorage.setItem('token', resp.data.token);
        navigate('/home');
      }
    })
   }else{
    axios.post('http://localhost:8420/v1/users', credentials).then((resp) => {
    console.log(resp);
    if (resp.status == 201) {
      navigate('/');
    }
  });
  };


  const handleClick = () => setSignUp( signUp === 0 ? 1 : 0);

  return (
    <div className='flex items-center flex-col'>
      <img className='size-1/2 object-contain' src={logo} />
      {signUp===0 ? (<div id="loginWrapper">
      <LoginForm
        username={username}
        password={password}
        setPassword={setPassword}
        setUsername={setUsername}
        authenticate={authenticate}
        type='Login'
      />

      <p className='mt-3'>
        Don't have an account yet?
        <strong>
          <Link onClick={handleClick}> Sign up here</Link>
        </strong>
        .
      </p>
      </div>) :
      (
        <div id="signUpWrapper" >
        <SignUpForm
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        setPassword={setPassword}
        setUsername={setUsername}
        setConfirmPassword={setConfirmPassword}
        authenticate={authenticate}
        type='Sign Up'
      />

      <p className='mt-3'>
        Already have an account?
        <strong>
          <Link onClick={handleClick}> Sign in here</Link>
        </strong>
        .
      </p>
    </div>
      )
      }
    </div>
  );
}
}