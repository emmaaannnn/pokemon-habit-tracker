import React from 'react';
import Header from '../components/Header.js';
import Navbar from '../components/NavBar.js';
import '../styles/Pokemon.css';

const Pokemon = ({ setCurrentPage }) => {
  return (
    <div>
      <Header />
      <h1>Pokemon</h1>
      <p>These are your Pokemon!</p>
      <Navbar onSelect={setCurrentPage} />
    </div>
  );
};

export default Pokemon;
