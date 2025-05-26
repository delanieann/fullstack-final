import React from 'react'
import Nav from './components/nav'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/home'
import Profile from './components/pages/profile'
import Login from './components/pages/login'
import Signup from './components/pages/signup'


function App() {
  return (    
    <BrowserRouter>
    <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
