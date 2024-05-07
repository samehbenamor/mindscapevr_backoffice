import React, { useState, useEffect } from "react"; // Add import statement for useEffect
import { Link } from "react-router-dom";
import "./CreateMeditation.css";
import axios from "axios";
import MeditationAddedSnackbar from "./MeditationAddedSnackbar";
import { Toaster, toast } from 'react-hot-toast'; // Import Toaster and toast

function CreateMeditation() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [category, setCategory] = useState("Meditation"); // Default category
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  //const [redirectToDashboard, setRedirectToDashboard] = useState(false); // State for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !timer || !image || !video || !selectedSubcategory) {
      handleClick("error", "Please fill in all required fields.");
      return;
    }
    // Check if title contains only alphabetical characters
    if (!/^[a-zA-Z ]+$/.test(title)) {
      handleClick("error", "Title should contain only alphabetical characters.");
      return;
    }
    // Check if timer is numerical
    if (isNaN(timer)) {
      handleClick("error", "Timer should be a numerical value.");
      return;
    }
    try {
      const requestBody = {
        title,
        description,
        timer,
        image,
        video,
        category,
        name: selectedSubcategory,
      };

      const response = await axios.post("http://localhost:6969/video/api/createMeditation", requestBody);

      console.log("Meditation created:", response.data);

      setTitle("");
      setDescription("");
      setTimer("");
      setImage("");
      setVideo("");
      setSelectedSubcategory("");
      handleClick("success", "Meditation added successfully!");      //setRedirectToDashboard(true);

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        const errorMessage = error.response.data.message;
        handleClick("error", errorMessage); // Open error toast with custom message
      } else if (error.request) {
        // The request was made but no response was received
        handleClick("error", "No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        handleClick("error", "An unexpected error occurred. Please try again later.");
      }
      console.error("Error creating meditation:", error);    }
  };
  /*
  if (redirectToDashboard) {
    return <Redirect to="/dashboard/meditations" />; // Redirect if state is true
  }*/

  useEffect(() => {
    // Fetch subcategories when category changes
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`/subcate/api/${category}`);
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [category]);

  const [open, setOpen] = useState(false);
  /*const handleClick = () => {
    setOpen(true);
  };*/

  const handleClick = (type, message) => {
    toast[type](message, { // Set position to top right
      style: {
        backgroundColor: '#333', // Dark mode background color
        color: '#fff', // Dark mode text color
      },
    }); 
    //setOpen(true);// Display toast based on type
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  return (
    <div className="containerMeditation">
          <Toaster />
       <form onSubmit={handleSubmit} className="form">
        <h1 className="title">Create a Meditation</h1>
        <h2 className="subTitle">Create an immersive meditation.</h2>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Description"
            className="input descriptionInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            
          />
        </div>
        <div className="inputContainer">
          <input
            type="number"
            placeholder="Timer"
            className="input"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
            pattern="\d*"
            
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Image URL"
            className="input"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Video"
            className="input"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            
          />
        </div>
        <div className="inputContainer">
          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            
          >
            <option value="Meditation">Meditation</option>
            <option value="Sleep">Sleep</option>
            <option value="BreathWork">BreathWork</option>
            <option value="Activity">Activity</option>
          </select>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Subcategory"
            className="input"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            
          />
        </div>

        <button type="submit" className="register">
          Create your meditation
        </button>
        <Link to="/dashboard/meditations" className="link">
          Go back
        </Link>
      </form>
      <MeditationAddedSnackbar
              open={open}
              message="Meditation added successfully!"
              onClose={handleClose}
            />
    </div>
  );
}

export default CreateMeditation;
