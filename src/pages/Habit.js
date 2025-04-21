import React from 'react';
import Header from '../components/Header.js';
import Navbar from '../components/NavBar.js';
import '../styles/Habit.css';
import PokemonParty from '../components/PokemonParty.js';

const Habit = ({ setCurrentPage }) => {
  return (
    <div className='HabitScreen'>
      <Header/>
      <Navbar onSelect={setCurrentPage} />
      <div className='NavbarMessage'>
        <h1>Habit Tracker</h1>
        <p>Track your habits and see your Pokémon progress.</p>
      </div>
      <div className='NoHabitsParty'>
        <PokemonParty/>
      </div>
    </div>
  );
};

export default Habit;
