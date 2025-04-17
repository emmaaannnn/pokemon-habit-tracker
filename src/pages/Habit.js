import React from 'react';
import Header from '../components/Header.js';
import Navbar from '../components/NavBar.js';

const Habit = ({ setCurrentPage }) => {
  return (
    <div>
      <Header />
      <h1>Habit Tracker</h1>
      <p>Track your habits and see your Pokémon progress.</p>
      <Navbar onSelect={setCurrentPage} />
    </div>
  );
};

export default Habit;
