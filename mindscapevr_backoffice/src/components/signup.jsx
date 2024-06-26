import React, { useState } from "react";
import "./signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., validation, API call)
    console.log("Form submitted:", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="formandshit">
        <h1 className="titleRegister">Create an Account</h1>
        <h2 className="Belowtitle">
          Dive in the MindScape therapeutic experience.
        </h2>

        <div className="nameRow">
          <input
            type="text"
            placeholder="First Name"
            className="nameInput"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="nameInput"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

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

        <div className="inputContainer">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            className="passwordInput"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="register">
          REGISTER
        </button>
      </form>
    </div>
  );
}


export default Signup;
