import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./signin.css"; // Make sure to import the correct CSS file
import { Link } from 'react-router-dom';

import together from '../assets/logobig.png';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., validation, API call)
    console.log("Form submitted:", {
      email,
      password,
    });
  };

  return (
    <div className="container">
         <div className="containercontent">
         <div className="header">
        <img src={together} alt="Together" className="logologin" />
        <h1 className="titleLogin">Your AI mental wellness buddy.</h1>
      </div>
      <form onSubmit={handleSubmit} className="form">

        <div className="inputContainer">
          <input
            type="email"
            placeholder="Email"
            className="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="inputContainer">
          <div className="passwordInputContainer">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEye : faEyeSlash}
              className="passwordIcon"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </div>
        </div>

        <button type="submit" className="login">
          LOGIN
        </button>
        <div className="registerText">
          <p>Don't have an account?</p>
          
          <Link to="/register" className="registerButton">Register</Link>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Login;
