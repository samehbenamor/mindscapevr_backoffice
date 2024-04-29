import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import logobig from "../assets/logobig.png"; // Import the image
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6; // Number of rows per page
  const navigate = useNavigate()

  // Fetch users data when component mounts
  useEffect(() => {
    // Define async function to fetch users
    const fetchUsers = async () => {
      try {
        console.log("Fetching users...")
        // Make GET request to fetch users
        const response = await axios.get("http://localhost:6969/users");
        // Set users state with data from response
        setUsers(response.data.list);
      } catch (error) {
        // Handle errors
        console.error("Error fetching users:", error);
      }
    };

    // Call fetchUsers function
    fetchUsers();
  }, []); // Empty dependency array to only run the effect once


  /////////////////////pagination part
  const indexOfFirstUser = (currentPage - 1) * rowsPerPage;
  // Calculate index of the last user on the current page
  const indexOfLastUser = currentPage * rowsPerPage;
  // Slice the array of users to get users for the current page
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Function to handle pagination navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(users.length / rowsPerPage);
  ///////////////////////////////////////////

  const navigateToUsers = () => {
    navigate('/dashboard/users');
  };

  const navigateToMeditations = () => {
    navigate('/dashboard/meditations');
  };


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
        <button className="sidebar-button" onClick={navigateToUsers}>
        <div className="sidebartext">Users</div>
      </button>
      <button className="sidebar-button" onClick={navigateToMeditations}>
        <div className="sidebartext">Meditations</div>
      </button>
          <button class="sidebar-button">
            <div className="sidebartext">Goals</div>
          </button>
        </div>
        <div className="dash-section">
         
          <div class="row-one">
            <div class="rectangle"></div>
            <div class="rectangle"></div>
            <div class="rectangle"></div>
          </div>
          
          <div class="row-two">
            <table class="dashboard-table">
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  
                </tr>
                <div className="seperator"></div>

              </thead>
              <tbody>
              {currentUsers.map((user, index) => (
                  <React.Fragment key={user._id}>
                    <motion.tr
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }} // Add delay based on index
                    >
                      <td>{user.fname}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                    </motion.tr>
                    {index !== currentUsers.length - 1 && (
                      <div className="seperator"></div>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {/* Render previous page button */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              {/* Render page numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
              {/* Render next page button */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
