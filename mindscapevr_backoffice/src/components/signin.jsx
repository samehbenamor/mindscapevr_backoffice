import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import axios from 'axios';

import together from '../assets/logobig.png';
import "./signin.css"; // Make sure to import the correct CSS file
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const navigateToUsers = () => {
    navigate('/');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:6969/users/login", {
        email,
        password
      });
      const { token } = response.data;

      // Save token to local storage
      localStorage.setItem('token', token);

      // Fetch user profile
      const profileResponse = await axios.get("http://localhost:6969/users/profile", {
        headers: {
          Authorization: token
        }
      });
      
      const userData = profileResponse.data;
      console.log(userData);
      // Save user data to local storage
      localStorage.setItem('UserInfo', JSON.stringify(userData));
      const userTest = localStorage.getItem('UserInfo');
      console.log("LOOK HERE:", userTest)
      // Redirect or perform any action after successful login
      console.log("Logged in successfully:", userData);
      navigateToUsers();

    } catch (error) {
      setError("Invalid email or password.");
      console.error("Error logging in:", error);
    }
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
          {error && <div className="error">{error}</div>}
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
