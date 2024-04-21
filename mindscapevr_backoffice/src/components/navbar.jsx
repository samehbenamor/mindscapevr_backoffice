import React, { useState } from 'react';
import './Navbar.css';
import whiteLogo from '../assets/whitelogo.png';
import fullyWhite from '../assets/fullywhite.png';
import 'material-symbols';
import { Link } from 'react-router-dom';

function Navbar({ bgColor }) 
{
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const handleRegisterClick = () => {
    setIsRegisterVisible(true);
  };
  return (
    <div className="navbar" style={{ backgroundColor: bgColor, transition: 'background-color 2s ease' }}>
      
    <img src={whiteLogo} alt="White Logo" className="logo" width="90" height="90" />
    <div className="spacer"></div> {/* Spacer for distance */}
    <img src={fullyWhite} alt="Fully White" className="fully-white" width="343" height="45.5" />
    <div className="left-buttons">
         <Link to="/register" className="navbar-button">Register</Link>
         <Link to="/login" className="navbar-button">Login</Link>
        
        
       
      </div>
      <button className="try-button">Try MindScapeVR <span class="material-symbols-outlined">Robot_2</span></button>
  </div>
  );
}

export default Navbar;