import React, { useState } from 'react';
import Home from './pages/Home';
import HabitTracker from './pages/HabitTracker';
import Login from './pages/Login';
import Navbar from './components/NavBar.js';


function App() {
  const [currentPage, setCurrentPage] = useState('login'); // Default to login page

  const handlePageSelect = (page) => {
    setCurrentPage(page); // Update the current page
  };

  return (
    <div>
      <Navbar onSelect={handlePageSelect} /> {/* Navbar on right side */}
      {currentPage === 'home' && <Home />}
      {currentPage === 'habitTracker' && <HabitTracker />}
      {currentPage === 'settings' && <div>Settings Page</div>}
    </div>
  );
}


export default App;