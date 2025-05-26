import React from 'react'
import Nav from './components/nav'
import "./App.css"
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/pages/home'
import Profile from './components/pages/profile'
import Login from './components/pages/login'
import Signup from './components/pages/signup'


function App() {
  return (
    <BrowserRouter>
      <Nav />
        <Route path="/">
          <Home />
        </Route>
        <Route path='/signup' >
          <Signup />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        
    </BrowserRouter>
  );
}

export default App;
