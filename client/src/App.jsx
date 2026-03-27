
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './features/Auth/Login'
import RequireAuth from './features/Auth/RequireAuth'
import Home from './pages/Home/Home'
import PublicRoute from './features/Auth/PublicRoute'
import Profile from './pages/Profile/Profile'
import Register from './features/Auth/Register'
import Header from './component/Header/Header'
import Group from './pages/Group/Group'
import Video from './pages/video/Video'
import Store from './pages/Store/Store'
import Friends from './pages/Friends/Friends'
import Verify from './features/Auth/verify'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element = {<Navigate to='/login'/>} />
          <Route path='/' element={<PublicRoute/>}>
            <Route path='/account/verify/:id' element={<Verify/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Route>
          <Route path='/' element={<RequireAuth/>}>
            <Route index element={<Home/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/group' element={<Group/>}/>
            <Route path='/video' element={<Video/>}/>
            <Route path='/store' element={<Store/>}/>
            <Route path='/friends' element={<Friends/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
