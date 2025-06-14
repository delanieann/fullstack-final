import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "USER", payload: data.user });
        nav("/");
      })
      .catch((err) => {
        console.log("Login error:", err);
      });
  };
  return (
    <div className="login-div">
      <div className="card login-card">
        <h4>PDX.FUN</h4>
        <br />
        <form>
          <div role="form" id="login" aria-label="Log-in to PDX.fun">
            <label for="email" className="login-label">
              Email
            </label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />

            <label for="password" className="password-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button
              className="btn waves-effect waves-light green lighten-1"
              onClick={Post}
            >
              Log In
            </button>
            <br />
            <p>
              Need a new account? <Link to="/login">Sign up.</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
