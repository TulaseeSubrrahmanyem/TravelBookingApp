import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
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
      alert('Login failed. Please check the console for details.');
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
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Don't have an account? <Link to="/signUp">Sign up here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
