import React, { useState, useEffect } from 'react';
import Dashboard from '../components/dashboard';
import NavbarDash from '../components/dashboardnav';
const Dash = () => {
  return (
    <div>
    <NavbarDash />
    <Dashboard />
    </div>
  );
};

export default Dash;
