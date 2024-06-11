import './App.css';
import './index.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Recipes from './components/Recipes.jsx';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Dashnav from './components/Dashnav';
import CRUDRecipe from './components/CRUDRecipe';
import Dashboard from './components/Dashboard';
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
    <>
    <div  className="page-container">
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
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path="/recipes" element={isLoggedIn ? <Recipes /> : <Navigate to="/login" />} />
            <Route path="/crud-recipe" element={isLoggedIn ? <CRUDRecipe /> : <Navigate to="/login" />} />
            <Route path="/user-profile" element={<UserProfile/>}/>
          </Routes>
      </BrowserRouter>
      </div>
      <Footer />
      </div>
    </>
  )
}

export default App
