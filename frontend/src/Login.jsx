// src/Login.js
import React, { useState } from 'react';

const Login = () => {
  // State variables to hold username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // login logic here
    if (username === 'admin' && password === 'password') {
      // Login successful, you can redirect the user to the dashboard or perform other actions
      console.log('Login successful');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      {/* Login form */}
      <h2>Login</h2>
      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Form with input fields for username and password */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          {/* Input field for username */}
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          {/* Input field for password */}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {/* Submit button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
