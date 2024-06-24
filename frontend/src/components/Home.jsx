import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* <h2 className="home-header">Welcome to yummage!</h2> */}
      <div className="home-hero">
        <div className='hero-content'>
        <h2 className="home-header">Welcome to yummage!</h2>
          <p className='home-h3'>A place to collect your recipes</p>
            <div>
              <Link to="/signup" className='hero-link'>Sign up and save now</Link>
            </div>
        </div>
        <div>
        <img src="/froggy.gif" alt="gif of a cartoon frog stirring a pot"/>
        </div>
      </div>
      
    </>
  )
}

export default Home
