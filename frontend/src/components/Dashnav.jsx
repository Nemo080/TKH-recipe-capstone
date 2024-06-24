import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dashnav({ handleLogout, user }) {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <div className="">
        <Link to="/app/user-profile">
          <h1 className="nav-name">yummage</h1>
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/app/user-profile" className="navtext">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/app/recipes" className="navtext">
            Explore
          </Link>
        </li>
        <details className="dropdown">
          <summary className="m-2 btn text-base nav-drop">
            
            <img className="user-icon" src="/usericon.png" />
           {user ? user.name : ""}
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] rounded-box w-55 text-base font-medium navdrop-menu">
          <li>
              <Link to="/app/user-profile">Your Recipes</Link>
            </li>
            <li>
              <Link to="/app/" onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        </details>
      </ul>
    </nav>
  );
}

export default Dashnav;
