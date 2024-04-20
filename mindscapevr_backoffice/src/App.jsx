import React, { useState, useEffect } from 'react';
import LandingPage from './components/landingpage';
import Navbar from './components/navbar';
import GetApp from './components/getapp';

function App() {
  const [count, setCount] = useState(0)
  const [bgColor, setBgColor] = useState('#ffb08e');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Check if the scroll position crosses a certain threshold
      const threshold = 500; // Change this value to the desired scroll position
      if (scrollTop > threshold) {
        setBgColor('#b19cd9');
      } else {
        setBgColor('#ffb08e');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="App" style={{ backgroundColor: bgColor, transition: 'background-color 2s ease' }}>
      <Navbar bgColor={bgColor} />
      
    <LandingPage />
    <GetApp />

  </div>
  )
}

export default App
