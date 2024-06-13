import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import App from '../App';
import UserProfile from './UserProfile';

function Dashnav({ handleLogout }) {

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
              <Link to="/crud-recipe" className='navtext'>Create</Link>
            </li>
            <li>
              <Link to="/recipes" className='navtext'>Explore</Link>
            </li>
            <li>
              <Link to="/user-profile" className='navtext'>Dashboard</Link>
            </li>
            <li>
              <Link to="/login" className='navtext' onClick={logout}>Logout</Link>
            </li>
            <details className="dropdown nav-drop">
                <summary className="m-2 btn text-base"> <img className= "user-icon" src="/src/assets/usericon.png" />user name</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] rounded-box w-55">
                    <li><a>item 1</a></li>
                    <li><a>item 2</a></li>
                </ul>
            </details>
          </ul>
    </nav>
  )
}

export default Dashnav
