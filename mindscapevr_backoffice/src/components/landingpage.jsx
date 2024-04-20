import React from 'react';
import './landing.css';
import 'material-symbols';
import logobig from '../assets/logobig.png'; // Import the image
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="left-half">
        {/* Text content for the left half */}
        <h1 className="title">
          <span className="white-text">Introducing</span> <span className="blue-text"><span className="underline"></span>MindscapeVR</span>
        </h1>
        <p className="description">
          We’ve trained a model called Mindscapevr which interacts in a therapeutic conversational way. Mindscapevr will answer and help you through various mental health questions, offering meditational guidance and fruitful clearance of <span class="mind">mind</span>.
        </p>
        <button className="action-button">Try MindscapeVR <span class="material-symbols-outlined">Robot_2</span></button>
        <p className="quote">“If you hear a voice within you saying 'you cannot paint,' then by all means paint and that voice will be silenced.” <span className="author">- Vincent van Gogh</span></p>

      </div>
      <div className="right-half">
      <div className="logo-container">

  
      <motion.img 
            src={logobig} 
            alt="Logo" 
            className="logo-big" 
            animate={{ 
              y: [-20, 20], 
              transition: { 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: [0.48, 0, 0.06, 1] // Bezier curve
              } 
            }} // Define continuous animation
          /> 
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
