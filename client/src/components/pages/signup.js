import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const Post = (event) => {
    event.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        nav("/login");
      })
      .catch((err) => {
        console.error("Signup error:", err);
      });
  };
  return (
    <div className="signup-div">
      <div className="card signup-card">
        <h5>Join PDX.FUN</h5>
        <br />
        <form>
          <div role="form" id="signup-form" aria-label="Sign up for PDX.fun">
            <label for="name" className="name-label">
              Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <br />

            <label for="email" className="email-label">
              Email
            </label>
            <input
              name="email"
              type="text"
              placeholder="Email"
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button
              className="btn waves-effect waves-light green lighten-1"
              onClick={Post}
            >
              Sign Up
            </button>
            <br />
            <p>
              Already have an account? <Link to="/login">Log in.</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
