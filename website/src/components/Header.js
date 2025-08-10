import React from 'react';
import '../styles/Header.css'; // Import the CSS for styling

const Header = ({ title, subtitle }) => {
  return (
    <div className="header">
      <h1>Pokemon Habit Tracker</h1>
    </div>
  );
};

export default Header;
