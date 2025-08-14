import React from 'react';
import '../styles/Navbar.css';

const Navbar = ({ onSelect }) => {
  return (
    <div className="navbar">
      <button className='HomeButton' onClick={() => onSelect('home')}>Home</button>
      <button className='PokemonButton' onClick={() => onSelect('pokemon')}>Pokemon</button>
      <button className='HabitsButton' onClick={() => onSelect('habits')}>Habits</button>
    </div>
  );
};

export default Navbar;
