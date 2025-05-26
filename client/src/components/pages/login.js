import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-card">
      <div className="card login">
        <h2>PDX.FUN</h2>
        <div role="form" id="login" aria-label="Log-in to PDX.fun">
          <label for="email" className="login-label">
            Email
          </label>
          <input name="email" type="text" placeholder="Email" />
          <br />

          <label for="password" className="password-label">
            Password
          </label>
          <input name="password" type="password" placeholder="Password" />

          <button className="btn waves-effect waves-light green lighten-1">
            Log In
          </button>
          <br />
          <h5>
            Need a new account? <Link to="/login">Sign up.</Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Login;
