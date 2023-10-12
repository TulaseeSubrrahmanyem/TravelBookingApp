import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import {store} from '../App';
import './index.css';

function LoginPage() {
  const [token, setToken] = useContext(store);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      if (!username.trim() || !password.trim()) {
        toast.error('Username and password are required.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            color: 'white',
            background: 'red',
          },
        });
      } else {
        const response = await axios.post('https://travelapp-l6go.onrender.com/api/users/login', {
          email: username, // Assuming you use email as username
          password: password,
        });
  
        const newToken = response.data.token;
  
        // Set the token in cookies with a 7-day expiration
        Cookies.set('jwtToken', newToken, { expires: 7 });
        console.log('Token stored in cookies:', newToken);
  
        // Store the token in local storage
        localStorage.setItem('jwtToken', newToken);
        console.log('Token stored in local storage:', newToken);
  
        // Set the token in context
        setToken(newToken);
  
        // Redirect to '/myprofile' after setting the token
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
  
      if (error.response) {
        const { status, data } = error.response;
        
        if (status === 401) {
          // Unauthorized (incorrect username or password)
          toast.error('Incorrect username or password.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              color: 'white',
              background: 'red',
            },
          });
        } else {
          // Other error, display a generic error message
          toast.error('Login failed. Please try again later.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              color: 'white',
              background: 'red',
            },
          });
        }
      } else {
        // Network error, display a generic error message
        toast.error('Network error. Please check your internet connection and try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            color: 'white',
            background: 'red',
          },
        });
      }
    }
  };
  
{/*google login */}
const responseGoogles = async (response) => {
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

    // Check if the login was successful based on server response
    if (serverResponse.status === 200 ) {
      const newToken = serverResponse.data.token;
      Cookies.set('jwtToken', newToken, { expires: 7 });
      console.log('Token stored in cookies:', newToken);
      // Store the token in local storage
      localStorage.setItem('jwtToken', newToken);
      console.log('Token stored in local storage:', newToken);
      setToken(newToken);
      navigate('/');
    } else {
      console.error('Login failed. Server response:', serverResponse);
      // Handle failed login (e.g., show an error message)
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  // Check for token in cookies on page load
  useEffect(() => {
    // Retrieve the token from cookies
    const storedToken = Cookies.get('jwtToken');
    console.log('Token retrieved from cookies:', storedToken);

    // Retrieve the token from local storage
    const storedLocalToken = localStorage.getItem('jwtToken');
    console.log('Token retrieved from local storage:', storedLocalToken);

    if (storedToken || storedLocalToken) {
      // Use the token from cookies if it exists
      setToken(storedToken || storedLocalToken);
    }
  }, [setToken]);

  // If a token is already set, redirect to '/myprofile'
  useEffect(() => {
    if (token) {
      navigate('/myprofile');
    }
  }, [token, navigate]);

  return (
    <div className='loginBg'>
      <div className='loginCard'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className='d-flex flex-column justify-content-center'>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <p style={{ textAlign: 'center', marginTop: '2px' }}>
              Don't have an account? <Link to="/signUp">Sign up here</Link>
            </p>
          </div>
          <p style={{textAlign:"center",fontSize:"16px",fontWeight:"550"}}>or</p>
          <div className="google-login-container">
          <GoogleOAuthProvider clientId="172944422596-inm0mj3q4i7v0fbquv3nv9j5u9fv2j6d.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={responseGoogles}
              onError={() => {
                console.log('Login Failed');
              }}
              theme='outline'
              text="login_with"
              shape='rectangular'
              width='200px'
              size='large'
            />
          </GoogleOAuthProvider>
        </div> 
        </form>
        
      </div>
      <ToastContainer className="toastContainer"/>
    </div>
  );
}

export default LoginPage;
