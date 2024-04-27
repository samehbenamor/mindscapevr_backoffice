import React, { useState, useEffect } from 'react';
import LandingPage from './components/landingpage';
import Navbar from './components/navbar';
import GetApp from './components/getapp';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; // Import components
import Register from './components/signup'; // Import your Register component
import Home from './homes/home'; // Import the wrapper component
import Login from './components/signin'; // Import your Login component
import Dashy from './homes/dash'; // Import your Dashboard component
import Dashmed from './components/dashmeditation';
function App() {
  const [count, setCount] = useState(0)
  const [bgColor, setBgColor] = useState('#ffb08e');
  //const navigate = useNavigate();

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
    <BrowserRouter>
    <div className="App" style={{ backgroundColor: bgColor, transition: 'background-color 2s ease' }}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/users" element={<Dashy />} />
      <Route path="/dashboard/meditations" element={<Dashmed />} />
      
      </Routes>
  </div>
  </BrowserRouter>
  )
}

export default App
