import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Recipes from './components/Recipes.jsx'


import Signup from './components/Signup';

import CreateRecipe from './components/CreateRecipe';


function App() {

  return (
    //frontend routing
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/recipes' element={<Recipes/>}/>
      <Route path="/create-recipe" element={<CreateRecipe/>}/>
    </Routes>
  )
}

export default App
