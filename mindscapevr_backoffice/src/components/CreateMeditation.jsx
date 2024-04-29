import React, { useState, useEffect } from "react"; // Add import statement for useEffect
import { Link } from "react-router-dom";
import "./CreateMeditation.css";
import axios from "axios";

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
      //setRedirectToDashboard(true);

    } catch (error) {
      console.error("Error creating meditation:", error);
    }
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

  return (
    <div className="containerMeditation">
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
        <div className="inputContainer">
          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
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
            required
          />
        </div>

        <button type="submit" className="register">
          Create your meditation
        </button>
        <Link to="/dashboard/meditations" className="link">
          Go back
        </Link>
      </form>
    </div>
  );
}

export default CreateMeditation;
