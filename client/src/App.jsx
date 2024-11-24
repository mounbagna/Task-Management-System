//import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import HomePage from './HomePage'
import AdminLogin from './AdminLogin'
import AdminPage from './AdminPage'
import EmailVerify from './EmailVerify'
import './index.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
<BrowserRouter>
<Routes>
  <Route path='/register' element={<Signup />}></Route>
  <Route path='/login' element={<Login />}></Route>
  <Route path='/home' element={<Home />}></Route>
  <Route path='/' element={<HomePage />}></Route>
  <Route path='/adminlogin' element={<AdminLogin />}></Route>
  <Route path='/adminpage' element={<AdminPage />}></Route>
  <Route path='/users/:id/verify/:token' element={<EmailVerify />}></Route>
</Routes>
</BrowserRouter>

  )
}

export default App
