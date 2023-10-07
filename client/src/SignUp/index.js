import React, { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import {store} from '../App';
import './index.css';
import { ToastContainer ,toast} from 'react-toastify';

function SignUp() {
  const navigate = useNavigate();
  const [token, setToken] = useContext(store);
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        username,
        email,
        password,
        confirmPassword,
      };

      const response = await axios.post('https://travelapp-l6go.onrender.com/api/users/register', data);
      // Log the registration data in the console
      console.log('Registration Data:', response.data);

      // Display a success toast message
      toast.success('Registration successful', {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please check the console for details.');
    }
  };

  const responseGoogle = async (response) => {
    try {
      console.log('Google OAuth response:', response);

      if (!response.credential) {
        console.error('ID token not found in the response');
        return;
      }

      const idToken = response.credential;
      console.log('Received idToken:', idToken);

      if (!idToken || !idToken.includes('.')) {
        console.error('Invalid idToken format');
        return;
      }

      const credentialResponse = jwtDecode(idToken);
      console.log('Decoded JWT:', credentialResponse);

      const userEmail = credentialResponse.email;
      const userName = credentialResponse.name;

      const serverResponse = await axios.post(
        'https://travelapp-l6go.onrender.com/api/users/google-login', // Remove one forward slash here
        {
          email: userEmail,
          username: userName,
          credential: idToken,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      

      console.log(serverResponse.data);

      const newToken = serverResponse.data.token;
      Cookies.set('jwtToken', newToken, { expires: 7 });
      console.log('Token stored in cookies:', newToken);
     // Store the token in local storage
     localStorage.setItem('jwtToken', newToken);
     console.log('Token stored in local storage:', newToken);
     setToken(newToken)
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='signUpBg'>
      <div className="signup-form">
        <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group ">
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>

          <div className="google-signin d-none d-md-block">
          <GoogleOAuthProvider clientId="172944422596-inm0mj3q4i7v0fbquv3nv9j5u9fv2j6d.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={() => {
              console.log('Login Failed');
            }}
            border="none"       
            
            shadow="none"      
             width="305px"
            className="google-signin-button"
          />
        </GoogleOAuthProvider>
        
        </div>
        <div className="google-signin d-block d-md-none">
        <GoogleOAuthProvider clientId="172944422596-inm0mj3q4i7v0fbquv3nv9j5u9fv2j6d.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            console.log('Login Failed');
          }}
          border="none"       
          
          shadow="none"      
           width="290px"
          className="google-signin-button"
        />
      </GoogleOAuthProvider>
      </div>
      
        </form>
      </div>
    </div>
  );
}

export default SignUp;
