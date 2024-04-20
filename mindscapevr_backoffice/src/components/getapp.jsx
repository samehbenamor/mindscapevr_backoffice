import React, { useEffect, useState } from "react";
import "./getapp.css";
import "material-symbols";
import logobig from "../assets/logobig.png"; // Import the image
import { motion } from "framer-motion";
import phone1 from "../assets/phone1.png"; // Import the image
import phone2 from "../assets/phone2.png"; // Import the image
import { useInView } from "react-intersection-observer";

import playstore from "../assets/playstore.png"; // Import the image
import applestore from "../assets/applestore.png"; // Import the image
const GetApp = () => {
  const [ref1, inView1] = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.5, // Percentage of element in view to trigger
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView1) {
      // Trigger animation for phone 1
    }
    if (inView2) {
      // Trigger animation for phone 2
    }
  }, [inView1, inView2]);


  
  const [backgroundColor, setBackgroundColor] = useState('#ffb08e');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Check if the scroll position crosses a certain threshold
      const threshold = 500; // Change this value to the desired scroll position
      if (scrollTop > threshold) {
        setBackgroundColor('#b19cd9');
      } else {
        setBackgroundColor('#ffb08e');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="landing-page">
      <div className="right-half">
        <div className="phone-container">
          <motion.img
            src={phone1}
            alt="Phone 1"
            className="phone-img1"
            ref={ref1}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: inView1 ? 1 : 0, x: inView1 ? 0 : 300 }}
            transition={{ duration: 2, ease: [0.47, 0.11, 0.32, 0.86] }} // Apply cubic bezier curve
          />
          <motion.img
            src={phone2}
            alt="Phone 2"
            className="phone-img2"
            ref={ref2}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: inView2 ? 1 : 0, x: inView2 ? 0 : -100 }}
            transition={{ duration: 1.9, ease: [0.47, 0.11, 0.32, 0.86] }} // Apply cubic bezier curve
          />
        </div>
      </div>
      <div className="left-half">
        <div className="crazy">
        <h1 className="title">
          <span className="white-text">Dive in</span>{" "}
          <span className="blue-text" style={{ color: backgroundColor === '#ffb08e' ? '#b19cd9' : '#ffb08e', transition: 'color 2s ease' }}>
            MindscapeVR
          </span>
        </h1>
        <p className="description">
          Unlock the app’s potential and find it right in your pocket whenever
          you go! Find Mindscapevr on both Google Play and App store for free!
        </p>
        <div className="store-icons">
          <img src={playstore} alt="Play Store" className="store-icon" />
          <img src={applestore} alt="Apple Store" className="store-icon" />
        </div>
        </div>
      </div>
    </div>
  );
};

export default GetApp;
