import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Habit from './pages/Habit.js';


function App() {
  const [currentPage, setCurrentPage] = useState('login'); // Default to login page

  const handlePageSelect = (page) => {
    setCurrentPage(page); // Update the current page
  };

  return (
    <div>
      {currentPage === 'login' && <Login onLogin={() => setCurrentPage('home')} />}
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'pokemon' && <div>Pokemon Page</div>}
      {currentPage === 'habits' && <Habit setCurrentPage={setCurrentPage} />}
    </div>
  );
}


export default App;