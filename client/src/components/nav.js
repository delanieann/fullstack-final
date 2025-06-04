import React, { useContext } from "react"
import { Link } from 'react-router-dom'
import { UserContext } from "../App"


const Nav = ()=>{
    const {state, dispatch} = useContext(UserContext)
    const login_nav = ()=>{
        if (state){
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Add Event</Link></li>,
                <li><Link to="/" onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"LOGOUT"})
                }}>Log out</Link></li>
            ]
        } else {
            return [
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">Sign up!</Link></li>
            ]
        }
    }
    return(
        <nav>
        <div className="nav-wrapper">
            <Link to="/" className="brand-logo left">
            <div>PDX-fun</div>
            </Link>
            <ul id="nav-mobile" className="right">
                <li><Link to="/calendar">Calendar</Link></li>,
                {login_nav()}
            </ul>
        
        </div>
        </nav>
    )
}

export default Nav