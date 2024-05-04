import React, { useState, useEffect } from 'react';
import LandingPage from '../components/landingpage';
import GetApp from '../components/getapp';
import Navbar from '../components/navbar';
const Home = () => {
    const [bgColor, setBgColor] = useState('#ffb08e');
  //const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user session variables if they exist
    const userData = localStorage.getItem('UserInfo');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    console.log("User data found in session storage:", user);
  }, []);

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
    <div>
    <Navbar user={user} bgColor={bgColor} />
    <LandingPage />
    <GetApp />
    </div>
  );
};

export default Home;
