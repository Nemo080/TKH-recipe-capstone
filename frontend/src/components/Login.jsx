// src/Login.js
import React, { useState } from 'react';
import axios from "axios";

const Login = () => {
  // State variables to hold username, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // login logic here
    // if (username === 'admin' && password === 'password') {
    //   // Login successful, you can redirect the user to the dashboard or perform other actions
    //   console.log('Login successful');
    // } else {
    //   setError('Invalid username or password');
    // }
    axios.post("http://localhost:3000/auth/login", { email, password })
    .then(result => {console.log(result)
    // navigate("/login")

    // storing the user's token in the local storage of the browser so they can stay logged in
      const userToken="userToken";
      localStorage.setItem(userToken, result.data.token)
      const token= localStorage.getItem(userToken)
      if (userToken) {
        console.log("token collected")
      }
      else{
        console.log("token not received")
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <div>
      {/* Login form */}
      <h2>Login</h2>
      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Form with input fields for email and password */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          {/* Input field for email */}
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
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
