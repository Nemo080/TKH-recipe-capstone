import './App.css'
import Login from './components/Login';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Recipes from './components/Recipes';



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
