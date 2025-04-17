import '../styles/Login.css';
import React, { useState } from 'react';
import { loginUser } from '../services/api'; // Import the API function

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the login API
      const { token, userId, username: loggedInUsername } = await loginUser(username, password);

      // Store token in localStorage or context for authenticated requests
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      // Trigger parent component's login handler
      onLogin(loggedInUsername);
    } catch (error) {
      setErrorMessage('Invalid username or password'); // Better error handling
    }
  };

  return (
    <div className='LoginScreen'>
      <div className='LoginContainer'>
        <h1 className='Header'>Login</h1>
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className='Header2'>
            <label>Username: </label>
            <input
              className='InputBox'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          {/* Password Input */}
          <div>
            <label className='Header2'>Password: </label>
            <input
              className='InputBox'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='LoginButton' type="submit">Login</button>
        </form>
        {errorMessage && <p className='ErrorMessage' style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;