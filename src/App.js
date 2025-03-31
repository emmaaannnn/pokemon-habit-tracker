import React, { useState } from 'react';
import Home from './pages/Home';
import HabitTracker from './pages/HabitTracker';
import Login from './pages/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // Default to login page

  const handleLogin = () => {
    setCurrentPage('home'); // Redirect to home after successful login
  };

  return (
    <div>
      {/* Show navigation only if logged in */}
      {currentPage !== 'login' && (
        <nav>
          <button onClick={() => setCurrentPage('home')}>Home</button>
          <button onClick={() => setCurrentPage('habitTracker')}>Habit Tracker</button>
        </nav>
      )}

      {currentPage === 'login' && <Login onLogin={handleLogin} />}
      {currentPage === 'home' && <Home />}
      {currentPage === 'habitTracker' && <HabitTracker />}
    </div>
  );
}

export default App;