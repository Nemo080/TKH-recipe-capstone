import './App.css';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
<<<<<<< Updated upstream
import Recipes from './components/Recipes.jsx';
import Navbar from './components/Navbar';
import Signup from './components/Signup';

import CRUDRecipe from './components/CRUDRecipe';

=======
import Signup from './components/Signup';
import RecipeForm from './components/CRUDRecipe';
import Recipes from './components/Recipes.jsx'
>>>>>>> Stashed changes



function App() {

  return (
    //frontend routing
<<<<<<< Updated upstream
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
=======
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/recipes' element={<Recipes/>}/>
      <Route path="/crud-recipe" element={<RecipeForm/>}/>
    </Routes>
>>>>>>> Stashed changes
  )
}

export default App
