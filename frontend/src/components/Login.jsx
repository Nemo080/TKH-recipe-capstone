// src/Login.js
import { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

const Login = ( { handleLogin } ) => {
  // State variables to hold username, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/login", { email, password })
    .then((result) => {

    // storing the user's token in the local storage of the browser so they can stay logged in
      const userToken="userToken";
      localStorage.setItem(userToken, result.data.token)
      const token= localStorage.getItem(userToken)
      if (token) {
        handleLogin();
        navigate("/app/user-profile")
      }
      else{
        throw new Error("Failed to store token.");
      }
    })
    .catch((err) => console.error(err));
  };

  return (
    <div className="login-container">
    <div>
      {/* Login form */}
      <h2 className="yummage-header">Login</h2>
      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Form with input fields for email and password */}
      <form onSubmit={handleSubmit}>
        <div className="yummage-label">
          <label>Email</label>
          {/* Input field for email */}
          <br></br>
          <input className='yummageinput' 
          type="text" 
          placeholder='Enter Email' 
          autoComplete='off' 
          name='email' 
          value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="yummage-label">
          <label>Password</label>
          {/* Input field for password */}
          <br></br>
          <input className='yummageinput' 
          type="password" 
          placeholder='Enter Password' 
          autoComplete='off' 
          name='email'  
          value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <p className="yummage-p">Don&apos;t have an account? 
        <Link to="/signup" className="signup-login"> Sign up
                </Link></p>
        {/* Submit button */}
        <button type="submit"  className="yummagesubmit btn">Login</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
