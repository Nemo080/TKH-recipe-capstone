import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import App from '../App';
import UserProfile from './UserProfile';
import Dashboard from './Dashboard';
import Logout from './Logout';






function Dashnav( handleLogout ) {

    const navigate = useNavigate();

    const logout = () => {
        handleLogout();
        navigate('/login'); // Redirect to the login page
    };

  return (
    <nav className="navbar">
        <div className=''>
            <Link to="/user-profile">
                <h1 className='nav-name'>yummage</h1>
            </Link>
        </div>
          <ul>
            <li>
              <Link to="/dashboard" className='navtext'>Dashboard</Link>
            </li>
          <li>
              <Link to="/crud-recipe" className='navtext'>Create</Link>
            </li>
            <li>
              <Link to="/recipes" className='navtext'>Explore</Link>
            </li>
            <details className="dropdown">
                <summary className="m-2 btn text-base nav-drop"> <img className= "user-icon" src="/src/assets/usericon.png" />user name</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] rounded-box w-55 text-base font-medium navdrop-menu">
                    <li><Link to="/dashboard">Your Recipes</Link></li>
                    <li><Link to="/dashboard" onClick={logout}>Logout</Link></li>
                </ul>
            </details>
          </ul>
    </nav>
  )
}

export default Dashnav
