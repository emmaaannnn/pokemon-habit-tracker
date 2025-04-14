import '../styles/Login.css';
import React, { useState } from 'react';


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users');

      if (!response.ok) {
          throw new Error('Failed to fetch');
      }

      const users = await response.json();

      console.log(users);

      const matchedUser = users.find(
          (user) => user.username === username && user.password === password
      );

      if (matchedUser) {
          onLogin(); // Call the login handler
      } else {
          setErrorMessage('Invalid username or password');
      }
  } catch (error) {
      setErrorMessage('Error connecting to the server');
  }
};


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;