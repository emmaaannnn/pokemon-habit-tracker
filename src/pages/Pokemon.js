import React from 'react';
import Header from '../components/Header.js';
import Navbar from '../components/NavBar.js';
import PokemonParty from '../components/PokemonParty.js';
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

      <div className='PokemonContainer'>
        <h1> Page 2 BRO </h1>
        <PokemonParty className="PokemonPokemonParty"/>
      </div>
    </div>
  );
};
export default Pokemon;
