import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import logobig from "../assets/logobig.png"; // Import the image
import { motion } from "framer-motion";

function Dashboard() {
  return (
    <div className="admin-dashboard">
      <div className="testingfirstsection">
        <div className="logo-column">
          <motion.img
            src={logobig}
            alt="Logo"
            className="logo-smalli"
            animate={{
              y: [0, 10],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: [0.48, 0, 0.06, 1], // Bezier curve
              },
            }} // Define continuous animation
          />
        </div>
        <div className="rectangle-column">
          <h1 className="dashboard-users">Dashboard - Users</h1>
          <h1 className="username">Hajer Bekir</h1>
        </div>
      </div>
      <div className="testingsecondsection">
        <div className="sidebar-section">
          <button class="sidebar-button">
            <div className="sidebartext">Users</div>
          </button>
          <button class="sidebar-button">
            <div className="sidebartext">Meditations</div>
          </button>
          <button class="sidebar-button">
            <div className="sidebartext">Goals</div>
          </button>
        </div>
        <div className="dash-section">
          {/* TODO this section goes for the stats
          <div class="row-one">
            <div class="rectangle"></div>
            <div class="rectangle"></div>
            <div class="rectangle"></div>
          </div>
          */}
          <div class="row-two">
            <table class="dashboard-table">
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Has Chatbot?</th>
                </tr>
                <div className="seperator"></div>

              </thead>
              <tbody>
                <tr>
                  <td>Doe</td>
                  <td>John</td>
                  <td>john@example.com</td>
                  <td>123456789</td>
                  <td>Yes</td>
                </tr>
                <div className="seperator"></div>
                <tr>
                  <td>Doe</td>
                  <td>John</td>
                  <td>john@example.com</td>
                  <td>123456789</td>
                  <td>Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
