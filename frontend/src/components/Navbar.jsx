import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className=''>
            <Link to="/">
                <h1 className='nav-name'>yummage</h1>
            </Link>
        </div>
          <ul>
          <li>
              <Link to="/create-recipe" className='navtext'>Create</Link>
            </li>
            <li>
              <Link to="/recipes" className='navtext'>Browse</Link>
            </li>
            <li>
              <Link to="/login" className='navtext'>Login</Link>
            </li>
            <li>
                <Link to="/signup" className='navsignup'>Sign Up</Link>
            </li>
          </ul>
      </nav>
  )
}
