import React from 'react';
import './Navbar.css';
import whiteLogo from '../assets/whitelogo.png';
import fullyWhite from '../assets/fullywhite.png';
import 'material-symbols';

function Navbar() {
  return (
    <div className="navbar">
      
    <img src={whiteLogo} alt="White Logo" className="logo" width="90" height="90" />
    <div className="spacer"></div> {/* Spacer for distance */}
    <img src={fullyWhite} alt="Fully White" className="fully-white" width="343" height="45.5" />
    <div className="left-buttons">
        <button className="navbar-button">Register</button>
        <button className="navbar-button">Login<span class="material-symbols-outlined">Open_In_New</span></button>
        
       
      </div>
      <button className="try-button">Try MindScapeVR <span class="material-symbols-outlined">Robot_2</span></button>
  </div>
  );
}

export default Navbar;