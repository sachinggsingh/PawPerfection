import React from 'react'
import Page from './pages/Home'
import Login from './components/Login'
import SignUp from './components/Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter> 
    <Routes>
      <Route path='/' element={<Page/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
