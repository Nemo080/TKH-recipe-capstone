import './App.css';
import './index.css';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Recipes from './components/Recipes.jsx';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Recipe from './components/Recipe';
import Dashnav from './components/Dashnav.jsx';
import CRUDRecipe from './components/CRUDRecipe';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check local storage for login state
    
    const loggedInState = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInState === 'true');
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  }
  return (

    //frontend routing
    <>
    <div className="page-container">
       <div className="content-wrap">
      <BrowserRouter>
          <div className="App">
            {isLoggedIn ? (
              <>
                <Dashnav handleLogout={handleLogout} />
              </>
            ) : (
              <>
                <Navbar handleLogin={handleLogin}/>
              </>
            )}
          </div>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>
            <Route path="/user-profile" element={isLoggedIn ? <UserProfile/> : <Navigate to="/login" />}/>
            <Route path='/signup' element={<Signup handleLogin={handleLogin}/>}/>
            <Route path="/recipes" element={isLoggedIn ? <Recipes /> : <Navigate to="/login" />} />
            <Route path="/crud-recipe" element={isLoggedIn ? <CRUDRecipe /> : <Navigate to="/login" />} />
            <Route path='/recipe/:name' element={<Recipe/>}/>
          </Routes>
      </BrowserRouter>
      </div>
      <Footer />
      </div>
    </>

  )
}

export default App
