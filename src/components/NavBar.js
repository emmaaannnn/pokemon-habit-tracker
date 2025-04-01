import React from 'react';
import '../styles/Navbar.css';

const Navbar = ({ onSelect }) => {
  return (
    <div className="navbar">
      <button onClick={() => onSelect('home')}>Home</button>
      <button onClick={() => onSelect('habitTracker')}>Habit Tracker</button>
      <button onClick={() => onSelect('settings')}>Settings</button>
    </div>
  );
};

export default Navbar;
