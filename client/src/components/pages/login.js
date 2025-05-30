import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const nav = useNavigate()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const Post = (event) => {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        nav("/");
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };
  return (
    <div className="login-card">
      <div className="card login">
        <h2>PDX.FUN</h2>
        <form>

        <div role="form" id="login" aria-label="Log-in to PDX.fun">

          <label for="email" className="login-label">
            Email
          </label>
          <input name="email" type="text" placeholder="Email" 
            value={email}
              onChange={(event) => setEmail(event.target.value)}/>
          <br />

          <label for="password" className="password-label">
            Password
          </label>
          <input name="password" type="password" placeholder="Password"
                      value={password}
              onChange={(event) => setPassword(event.target.value)}/>

          <button className="btn waves-effect waves-light green lighten-1"
          onClick={Post}>
            Log In
          </button>
          <br />
          <h5>
            Need a new account? <Link to="/login">Sign up.</Link>
          </h5>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
