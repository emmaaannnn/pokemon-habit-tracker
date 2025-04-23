import '../styles/Login.css';
import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api'; // Import both API functions

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login and Register

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      // Handle user registration
      try {
        const result = await registerUser(username, password);
        setSuccessMessage(result.message); // Show success message from the server
        setIsRegistering(false); // Switch back to login mode after successful registration
        setUsername('');
        setPassword('');
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Failed to register user.');
      }
    } else {
      // Handle user login
      try {
        const { token, userId, username: loggedInUsername } = await loginUser(username, password);

        // Store token and userId in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        // Trigger parent component's login handler
        onLogin(loggedInUsername);
      } catch (error) {
        setErrorMessage('Invalid username or password');
      }
    }
  };

  return (
    <div className="LoginScreen">
      <div className="LoginContainer">
        <h1 className="Header">{isRegistering ? 'Register' : 'Login'}</h1>
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="Header2">
            <label>Username: </label>
            <input
              className="InputBox"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="Header2">Password: </label>
            <input
              className="InputBox"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="LoginButton" type="submit">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        {/* Error and Success Messages */}
        {errorMessage && <p className="ErrorMessage" style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p className="SuccessMessage" style={{ color: 'green' }}>{successMessage}</p>}

        {/* Toggle Button */}
        <button
          className="ToggleButton"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setErrorMessage('');
            setSuccessMessage('');
          }}
        >
          {isRegistering ? 'Back to Login' : 'Register'}
        </button>
      </div>
    </div>
  );
};

export default Login;