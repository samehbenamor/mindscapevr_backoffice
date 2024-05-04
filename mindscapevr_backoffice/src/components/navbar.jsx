import React, { useState, useEffect } from 'react';
import './Navbar.css';
import whiteLogo from '../assets/whitelogo.png';
import fullyWhite from '../assets/fullywhite.png';
import 'material-symbols';
import { Link } from 'react-router-dom';

function Navbar({ bgColor, user }) {
  const [userSession, setUser] = useState(null);

  useEffect(() => {
    // Check if user info exists in session storage
    const userData = localStorage.getItem('UserInfo');
    if (userData) {
      console.log("User data found in session storage:", userData);
      setUser(JSON.parse(userData));
    }
  }, []);
  console.log("From navbar user:", user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleHover = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('UserInfo');
    localStorage.removeItem('token'); // Assuming you stored the token as well
    // Optionally redirect to the login page
    // navigate('/login');
    window.location.reload();

  };

  return (
    <div className="navbar" style={{ backgroundColor: bgColor, transition: 'background-color 2s ease' }}>
      <img src={whiteLogo} alt="White Logo" className="logo" width="90" height="90" />
      <div className="spacer"></div> {/* Spacer for distance */}
      <img src={fullyWhite} alt="Fully White" className="fully-white" width="343" height="45.5" />
      <div className="left-buttons">
        {userSession ? (
          <>
           <span
           className="user-button"
           
         >
           {userSession.name}
         </span>
                     <button className="user-button" onClick={handleLogout}>Logout</button>
                     {userSession.isAdmin && ( // Check if user is admin
              <Link to="/dashboard/meditations" className="user-button">Dashboard</Link>
            )}
                     </>
        ) : (
          <Link to="/login" className="navbar-button">Login</Link>
        )}
      </div>
      <button className="try-button">Try MindScapeVR <span className="material-symbols-outlined">Robot_2</span></button>
    </div>
  );
}

export default Navbar;
