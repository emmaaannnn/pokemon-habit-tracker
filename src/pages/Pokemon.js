import React from 'react';
import Header from '../components/Header.js';
import Navbar from '../components/NavBar.js';
import PokemonParty from '../components/PokemonParty.js';
import PokemonStorage from '../components/PokemonStorage.js';
import '../styles/Pokemon.css';

const Pokemon = ({ setCurrentPage }) => {
  return (
    <div className='PokemonScreen'>
      <Header/>
      <Navbar onSelect={setCurrentPage} />
      <div className='NavbarMessage'>
        <h4>Pokemon</h4>
        <p>These are your pokemon</p>
      </div>

      <div className='NoHabitsParty'>
        <PokemonParty/>
      </div>

      <div className='PokemonStorage'>
        <PokemonStorage/>
      </div>
    </div>
  );
};
export default Pokemon;
