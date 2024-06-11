import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* <h2 className="home-header">Welcome to yummage!</h2> */}
      <div className="home-hero">
        <div className='hero-content'>
        <h2 className="home-header">Welcome to yummage!</h2>
          <h3 className='home-h3'>A place to collect your recipes</h3>
          <br></br>
            <div>
              <Link to="/signup" className='hero-link'>Sign up and save now</Link>
            </div>
        </div>
        <div>
        <img src="/src/assets/froggy.gif" alt="gif of a cartoon frog stirring a pot"/>
        </div>
      </div>
    </>
  )
}

export default Home
