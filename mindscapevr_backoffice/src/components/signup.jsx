import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './signup.css';

const Signup = ({ navigation }) => {
  const [Name, setName] = useState('');
  const [Fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRegisterPress = () => {
    setErrorText('');
    navigation.navigate('Login');
  };

  const SignupComplete = () => {
    navigation.navigate('Verif');
  };

  const signup = async () => {
    try {
      setErrorText('');
      if (!Name || !Fname || !email || !password || !confirmPassword) {
        setErrorText('*Fill in all fields before registering');
        setIsErrorVisible(true);
        return;
      }
      // Validation checks
      // createUser logic
      SignupComplete();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Create an account</h1>
      <p className="dive-text">Dive into the MindScape therapeutic experience.</p>
      <div className="name-container">
        <input
          type="text"
          className="first-name"
          placeholder="First name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="last-name"
          placeholder="Last name"
          value={Fname}
          onChange={(e) => setFname(e.target.value)}
        />
      </div>
      <input
        type="email"
        className="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="password-container">
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          className="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="toggle-password" onClick={togglePasswordVisibility}>
          <i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
        </button>
      </div>
      <input
        type="password"
        className="confirm-password"
        placeholder="Retype password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {isErrorVisible && <p className="error">{errorText}</p>}
      <button className="register-button" onClick={signup}>Register</button>
      <p className="question">Already have an account? <span className="login-link" onClick={handleRegisterPress}>Login</span></p>
    </div>
  );
};

export default Signup;
