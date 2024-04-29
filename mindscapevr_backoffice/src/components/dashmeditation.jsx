import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import logobig from "../assets/logobig.png"; // Import the image
import { motion } from "framer-motion";
import axios from "axios";
import CustomSnackbar from "./CustomSnackbar";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

function DashMeditations() {
  const [meds, setMeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 9; // Number of rows per page

  // Fetch users data when component mounts
  useEffect(() => {
    // Define async function to fetch users and their corresponding subcategories
    const fetchData = async () => {
      try {
        console.log("Fetching Meditations...");
        // Make GET request to fetch users
        const responseMeds = await axios.get("http://localhost:6969/video");
        // Set users state with data from response
        setMeds(responseMeds.data);

        // Fetch subcategories for each user
        const subcategoryPromises = responseMeds.data.map(async (user) => {
          if (user.subCategory) {
            try {
              const responseSub = await axios.get(
                `http://localhost:6969/subcate/${user.subCategory}`
              );
              // Update user with subcategory data
              user.subCategoryData = responseSub.data;
            } catch (error) {
              console.error("Error fetching subcategory:", error);
              user.subCategoryData = null;
            }
          }
          return user;
        });

        // Wait for all subcategory requests to complete
        const updatedMeds = await Promise.all(subcategoryPromises);
        // Set the updated users state
        setMeds(updatedMeds);
        setLoading(false);

        // Set loading state to false
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData function
    fetchData();
  }, []);

  /////////////////////pagination part
  const indexOfFirstUser = (currentPage - 1) * rowsPerPage;
  // Calculate index of the last user on the current page
  const indexOfLastUser = currentPage * rowsPerPage;
  // Slice the array of users to get users for the current page
  const currentUsers = meds.slice(indexOfFirstUser, indexOfLastUser);

  // Function to handle pagination navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(meds.length / rowsPerPage);
  ///////////////////////////////////////////
  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to the backend endpoint
      await axios.delete(`http://localhost:6969/video/${id}`);
      // If successful, remove the deleted video from the state or reload the data
      // For example:
      // setVideos(videos.filter(video => video._id !== id));
      // Or, if you want to reload the data:
      // fetchData();
      handleClick();
    } catch (error) {
      console.error("Error deleting video:", error);
      // Handle errors, if any
    }
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
          <h1 className="dashboard-users">Dashboard - Meditations</h1>
          <h1 className="username">Hajer Bekir</h1>
        </div>
      </div>
      <div className="testingsecondsection">
        <div className="sidebar-section">
          <button className="sidebar-button">
            <div className="sidebartext">Users</div>
          </button>

          <button className="sidebar-button">
            <div className="sidebartext">Meditations</div>
          </button>

          <button className="sidebar-button">
            <div className="sidebartext">Goals</div>
          </button>
        </div>
        <div className="dash-section">
          <div className="row-two">
            <CustomSnackbar
              open={open}
              message="Meditation deleted successfully!"
              onClose={handleClose}
            />
            <div className="abovetable">
              <Link to="/dashboard/meditations/create">
                <button className="meditation-add-button">
                  <div className="sidebartext">Add Meditation</div>
                </button>
              </Link>
            </div>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Length (mins)</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th>Plays</th>
                  <th>Actions</th>
                </tr>
                <div className="seperator"></div>
              </thead>
              <tbody>
                
              {loading ? (
                  <tr>
                    <td colSpan="7">Loading...</td>
                  </tr>
                ) : (
                  currentUsers.map((user, index) => (
                    <React.Fragment key={user._id}>
                      <motion.tr
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }} // Add delay based on index
                      >
                        <td>{user.title}</td>
                        <td>
                          {user.description && user.description.length > 20
                            ? `${user.description.substring(0, 20)}...`
                            : user.description}
                        </td>
                        <td>{user.timer}</td>
                        <td>
                          {user.subCategoryData
                            ? user.subCategoryData.category || "Unknown"
                            : "Unknown"}
                        </td>
                        <td>
                          {user.subCategoryData
                            ? user.subCategoryData.name || "Unknown"
                            : "Unknown"}
                        </td>
                        <td>{user.numPlays}</td>
                        <td>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="delete-button"
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>
                      {index !== currentUsers.length - 1 && (
                        <div className="seperator"></div>
                      )}
                    </React.Fragment>
                  ))
                )}
             
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

export default DashMeditations;
