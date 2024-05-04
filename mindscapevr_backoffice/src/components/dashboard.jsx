import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import logobig from "../assets/logobig.png"; // Import the image
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApexCharts from "apexcharts";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7; // Number of rows per page
  const navigate = useNavigate();

  // Fetch users data when component mounts
  useEffect(() => {
    // Define async function to fetch users
    const fetchUsers = async () => {
      try {
        console.log("Fetching users...");
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
    navigate("/dashboard/users");
  };

  const navigateToMeditations = () => {
    navigate("/dashboard/meditations");
  };
  const fetchUserBannedCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6969/users/stat/count"
      );
      setUserBannedCount(response.data.bannedCount);
      setUserNonBannedCount(response.data.nonBannedCount);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  const handleBanUser = async (userId, isBanned) => {
    try {
      // Send a request to toggle the ban status of the user
      const response = await axios.put(
        `http://localhost:6969/users/${userId}/toggle-ban`,
        { isBanned: !isBanned }
      );
      // Update the users state with the updated user
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isBanned: !isBanned } : user
        )
      );
      fetchUserBannedCount();
    } catch (error) {
      console.error("Error banning/unbanning user:", error);
    }
  };

  ////////Session part////////
  const [userSession, setUser] = useState(null);

  useEffect(() => {
    // Check if user info exists in session storage
    const userData = localStorage.getItem("UserInfo");
    if (userData) {
      console.log("User data found in Dashboard session storage:", userData);
      setUser(JSON.parse(userData));
    }
  }, []);
  console.log("From dashboard user:", userSession);
  ///////////////////////////

  //////// Stats part of the code
  const [topUserRatingsData, setTopUserRatingsData] = useState([]);
  const [userBannedCount, setUserBannedCount] = useState(0);
  const [userNonBannedCount, setUserNonBannedCount] = useState(0);
  const [dataFetched, setDataFetched] = useState(false); // Add state to track if data has been fetched

  useEffect(() => {
    // Function to fetch data for top users with most ratings
    const fetchTopUserRatingsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6969/users/stat/topuserratings"
        );
        setTopUserRatingsData(response.data);
      } catch (error) {
        console.error("Error fetching top user ratings:", error);
      }
    };

    // Function to fetch data for user banned and non-banned count

    // Call the fetch functions
    fetchTopUserRatingsData();
    fetchUserBannedCount();
  }, []);

  useEffect(() => {
    // Check if both top user ratings data and user count data have been fetched
    if (
      topUserRatingsData.length > 0 &&
      userBannedCount !== 0 &&
      userNonBannedCount !== 0
    ) {
      setDataFetched(true); // Set dataFetched to true when both data sets are available
    }
  }, [topUserRatingsData, userBannedCount, userNonBannedCount]);

  useEffect(() => {
    // Render charts when data is available
    if (dataFetched) {
      renderCharts(); // Call renderCharts() only once after all data has been fetched
    }
  }, [dataFetched]);

  const renderCharts = () => {
    // Render ApexCharts for each statistic
    renderTopUserRatingsChart();
    renderUserBannedCountChart();
  };

  const renderTopUserRatingsChart = () => {
    const options = {
      chart: {
        type: "bar",
        height: 100,
        width: "100%",
      },
      series: [
        {
          name: "Number of Ratings",
          data: topUserRatingsData.map((user) => user.numberOfRatings),
        },
      ],
      xaxis: {
        categories: topUserRatingsData.map((user) => user.username),
      },
    };

    new ApexCharts(
      document.querySelector("#topUserRatingsChart"),
      options
    ).render();
  };

  const renderUserBannedCountChart = () => {
    const options = {
      chart: {
        type: "pie",
        height: 110,
        width: "100%",
        fontFamily: "'Montserrat', sans-serif",
        // Set font family
      },
      series: [userBannedCount, userNonBannedCount],
      labels: ["Banned Users", "Non-banned Users"],

      colors: ["#b19cd9", "#ffd3b5"], // Set custom colors
    };

    new ApexCharts(
      document.querySelector("#userBannedCountChart"),
      options
    ).render();
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
        {userSession ? (
          <div className="rectangle-column">
            <h1 className="dashboard-users">Dashboard - Meditations</h1>
            <h1 className="username">{userSession.name}</h1>
          </div>
        ) : null}
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
          {/*
          <div class="row-one">
          <div class="rectangle" ></div>
          
    <div class="rectangle2" id="userBannedCountChart"></div>
          </div>
*/}

          <div class="row-two">
            <table class="dashboard-table">
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Banned ?</th> {/* New column for ban status */}
                  <th>Actions</th> {/* Column for ban/unban button */}
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
                      <td>{user.isBanned ? "Yes" : "No"}</td>{" "}
                      {/* Display ban status */}
                      <td>
                        <button
                          onClick={() => handleBanUser(user._id, user.isBanned)}
                          className="delete-button"
                          style={{ width: "80px" }}
                        >
                          {user.isBanned ? "Unban" : "Ban"}
                        </button>
                      </td>
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
