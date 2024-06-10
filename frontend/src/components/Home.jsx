import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h2 className="home-header">Welcome to yummage!</h2>
      <div className="home-hero">
        <div>
          <h3 className='home-h3'>A place to collect your recipes</h3>
            <div>
              <Link to="/signup" className='hero-link'>Sign up and save now</Link>
            </div>
        </div>
        <img className="homegif" src="/src/assets/froggy.gif"/>
      </div>
    </>
  )
}

export default Home
