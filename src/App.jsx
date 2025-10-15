
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ErrorPage from './pages/ErrorPage'
import PrivateRoutes from './routes/PrivateRoutes'
import ProfilePage from './pages/ProfilePage'
function App() {


  return (
   <>
   <Routes>
    <Route element={<PrivateRoutes/>} >
        <Route element={<HomePage/>} path='/' exact />
        <Route element={<ProfilePage/>} path='/me'  />
    </Route>
    
    <Route element={<LoginPage/>} path='/login' />
    <Route element={<RegisterPage/>} path='/registration' />
    <Route element={<ErrorPage/>} path='*' />
   </Routes>
   </>
  )
}

export default App
