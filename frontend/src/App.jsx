import './App.css'

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
