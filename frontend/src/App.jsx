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
import Logout from './components/Logout';
import Layout from './components/Layout';
import AppLayout from './components/Applayout';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for login state
    
    const loggedInState = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInState === 'true');
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '/login';
  }

  if (loading) {
    // Render a loading indicator or nothing while checking login state
    return <div>Loading...</div>;
  }

  return (

    //frontend routing
    <>
    <div className="page-container">
       <div className="content-wrap">
      <BrowserRouter>
          {/* <div className="App">
            {isLoggedIn ? (
              <>
                <Dashnav handleLogout={handleLogout} />
              </>
            ) : (
              <>
                <Navbar handleLogin={handleLogin}/>
              </>
            )}
          </div> */}
          <Routes>
            <Route path="/" element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>
            <Route path="/user-profile" element={isLoggedIn ? <UserProfile/> : <Navigate to="/login" />}/>
            <Route path='/signup' element={<Signup handleLogin={handleLogin}/>}/>
            </Route>
            <Route path="/" element={<AppLayout handleLogout={handleLogout}/>}>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path="/recipes" element={isLoggedIn ? <Recipes /> : <Navigate to="/login" />} />
            <Route path="/crud-recipe" element={isLoggedIn ? <CRUDRecipe /> : <Navigate to="/login" />} />
            <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
            <Route path='/recipe/:name' element={<Recipe/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </BrowserRouter>
      </div>
      <Footer />
      </div>
    </>

  )
}

export default App
