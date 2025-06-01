import React, { useContext } from "react"
import { Link } from 'react-router-dom'
import { UserContext } from "../App"
import flag from "./images/pdx-logo.png"


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
        <div className="nav-wrapper white">
            <div className="circle-logo">
            <img src={flag} />
            </div>
            
            <Link to="/" className="brand-logo">
            <div>PDX-fun</div></Link>
            <ul id="nav-mobile" className="right">
                {login_nav()}
            </ul>
        
        </div>
        </nav>
    )
}

export default Nav