import React, {useEffect, createContext, useReducer, useContext } from 'react'
import Nav from './components/nav'
import "./App.css"
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/pages/home'
import Profile from './components/pages/profile'
import Login from './components/pages/login'
import Signup from './components/pages/signup'
import Create from './components/pages/create'
import { initialState, reducer } from './components/reducer'

export const UserContext = createContext()

const Routing = () =>{
  const nav = useNavigate()
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))

    if (user){
      dispatch({type:"USER", payload:user})
      nav('/')
    } else {
      nav('/login')
    }
  }, []);
  return (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route exact path="/profile" element={<Profile />} />
    <Route path="/create" element={<Create />} />
  </Routes>
  )};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
    <Nav />
    <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
