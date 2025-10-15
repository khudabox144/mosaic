
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ErrorPage from './pages/ErrorPage'

function App() {


  return (
   <>
   <Routes>
    <Route element={<HomePage/>} path='/' exact />
    <Route element={<LoginPage/>} path='/login' />
    <Route element={<RegisterPage/>} path='/register' />
    <Route element={<ErrorPage/>} path='*' />
   </Routes>
   </>
  )
}

export default App
