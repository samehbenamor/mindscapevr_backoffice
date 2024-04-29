import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import "./CreateMeditation.css"; // Use a separate CSS file for styling
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ModifyMeditation() {
  const [title, setTitle] = useState(""); // Change the state variable name
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const location = useLocation(); // Use useLocation hook to access location state
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.meditation) {
      const { title, description, timer, image, video } = location.state.meditation;
      setTitle(title);
      setDescription(description);
      setTimer(timer);
      setImage(image);
      setVideo(video);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading state to true
      const requestBody = {
        title,
        description,
        timer,
        image,
        video,
      };

      const response = await axios.put(
        `http://localhost:6969/video/${location.state.meditation._id}`,
        requestBody
      );

      console.log("Meditation updated:", response.data);

      setLoading(false);
      navigate("/dashboard/meditations")// Set loading state to false after request completes
    } catch (error) {
      console.error("Error updating meditation:", error);
      setLoading(false); // Set loading state to false in case of error
    }
  };


  return (
    <div className="containerMeditation">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="title">Modify Meditation</h1>
        <h2 className="subTitle">Modify an existing meditation.</h2>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Description"
            className="input descriptionInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
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
            required
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Image URL"
            className="input"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Video"
            className="input"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="register">
          Modify your meditation{" "}
        </button>
        <Link to="/dashboard/meditations" className="link">
          Go back
        </Link>
      </form>
    </div>
  );
}

export default ModifyMeditation;
