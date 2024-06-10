import './App.css';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Recipes from './components/Recipes.jsx';
import Navbar from './components/Navbar';
import Signup from './components/Signup';

import CRUDRecipe from './components/CRUDRecipe';




function App() {

  return (
    //frontend routing
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/recipes' element={<Recipes/>}/>
          <Route path="/crud-recipe" element={<CRUDRecipe/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
