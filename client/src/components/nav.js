
const Nav = ()=> {
    return(
        <nav>
        <div className="nav-wrapper white">
            <a href="#" className="brand-logo">PDX-fun</a>
            <ul id="nav-mobile" className="right">
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Sign up!</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </div>
        </nav>
    )
}

export default Nav