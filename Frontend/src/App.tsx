import React from 'react'
import { Route,BrowserRouter as Router , Routes } from 'react-router-dom'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Home from './components/Home/Home'

const App : React.FC = () => {
  return (
    <>    
     <Router>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/register" element={<Register/>} ></Route>
      <Route path="/login" element={<Login/>} ></Route>
      </Routes>
     </Router>
    

    </>
  )
}

export default App