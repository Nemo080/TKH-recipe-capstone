
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
              <Link to="/" className='navtext'>Home</Link>
            </li>
            <li>
              <Link to="/login" className='navtext'>Login</Link>
            </li>
            <li className='signup-button'>
                <Link to="/signup" className='navsignup'>Sign Up</Link>
            </li>
          </ul>
      </nav>
  )
}
