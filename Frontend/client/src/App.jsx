import React, { lazy, Suspense } from 'react'
import LoadingSpinner from './components/LoadingSpinner'
import { BrowserRouter, Routes, Route } from "react-router-dom";



const Courses = lazy(()=>import ('./pages/Courses'))
const PetPage  = lazy(()=>import ('./pages/PetPage'))
const Contact = lazy(()=>import ('./components/Contact'))
const  SignUp = lazy(()=> import('./components/Signup'))
const Login = lazy(()=> import('./components/Login'))
const Page = lazy(()=> import('./pages/Home'))

const App = () => {
  return (
    <BrowserRouter> 
    <Routes>
      <Route path='/' element={<Suspense fallback={<LoadingSpinner />}><Page /></Suspense>}/>
      <Route 
          path="/login" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Login />
            </Suspense>
          }
        />
      <Route 
          path="/signup" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <SignUp />
            </Suspense>
          }
        />
      <Route 
          path="/pet" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PetPage />
            </Suspense>
          }
        />
      <Route path='/contact' element={<Contact/>}/>
      <Route 
          path="/course" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Courses />
            </Suspense>
          }
        />
    </Routes>
    </BrowserRouter>
  )
}

export default App
