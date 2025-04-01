import React from 'react';
import '../styles/Navbar.css';

const Navbar = ({ onSelect }) => {
  return (
    <div className="navbar">
      <button onClick={() => onSelect('home')}>Home</button>
      <button onClick={() => onSelect('pokemon')}>Pokemon</button>
      <button onClick={() => onSelect('habits')}>Habits</button>
    </div>
  );
};

export default Navbar;
