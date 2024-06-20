import { useState } from "react";
import "/src/index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Signup({ handleLogin }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/signup", { name, email, password })
      .then((result) => {
        const userToken = "userToken";
        localStorage.setItem(userToken, result.data.token);
        const token = localStorage.getItem(userToken);
        if (token) {
          handleLogin();
          navigate("/app/user-profile");
        } else {
          throw new Error("Failed to store token.");
        }
      })

      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="signup-container">
        <h2 className="yummage-header">Create your account</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="yummage-label">
              <label htmlFor="email">Name</label>
              <br></br>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="email"
                className="yummageinput"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="yummage-label">
              <label htmlFor="email">Email</label>
              <br></br>
              <input
                type="text"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="yummageinput"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="yummage-label">
              <label htmlFor="email">Password</label>
              <br></br>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="yummageinput"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="yummage-p">
              Already have an account?&nbsp; 
            <Link to="/login" className="signup-login">
                Log in
              </Link>
            </p>
            <button type="submit" className="yummagesubmit btn">
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
