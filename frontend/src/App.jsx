import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Recipes from './components/Recipes.jsx'

function App() {

  return (
    //frontend routing
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/recipes' element={<Recipes/>}/>
    </Routes>
  )
}

export default App
