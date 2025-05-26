import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="signup-card">
      <div className="card signup">
        <h2>Join PDX.FUN</h2>
        <div role="form" id="signup-form" aria-label="Sign up for PDX.fun">
          <label for="name" className="name-label">
            Name
          </label>

          <input name="email" type="text" placeholder="Name" />
          <br />
          <label for="email" className="email-label">
            Email
          </label>
          <input name="email" type="text" placeholder="Email" />
          <br />

          <label for="password" className="password-label">
            Password
          </label>
          <input name="password" type="password" placeholder="Password" />

          <button className="btn waves-effect waves-light green lighten-1">
            Sign Up
          </button>
          <br />
          <h5>Already have an account? <Link to="/login">Log in.</Link></h5>
        </div>
      </div>
    </div>
  );
};

export default Signup;
