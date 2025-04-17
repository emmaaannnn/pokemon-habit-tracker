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
    <div className='LoginContainer'>
      <h1 className='Header'>Login</h1>
      <form onSubmit={handleSubmit}>

        {/* username section */}
        <div className='Header2'>
          <label>Username: </label>
          <input className='InputBox'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        {/* password section */}
        <div>
          <label className='Header2'>Password: </label>
          <input className='InputBox'
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
  );
};

export default Login;