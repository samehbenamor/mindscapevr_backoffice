import React from 'react';
import './dashboardnav.css';
import { Link } from 'react-router-dom';

function DashboardNav() {
  return (
    <div className="dashcontent">
    <div className="dashnavbar">
      <div className="dashnavbar-links">
        <Link to="/dashboard" className="dash-link">Mindscape Dashboard</Link>
        <Link to="/users" className="dash-link">Users</Link>
        <Link to="/meditations" className="dash-link">Meditations</Link>
        <Link to="/account" className="dash-link">User Account</Link>
      </div>
    </div>
    </div>
  );
}

export default DashboardNav;
