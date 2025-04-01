import React from 'react';
import Navbar from '../components/NavBar.js';
import Header from '../components/Header';



const Home = ({ setCurrentPage }) => {
  return (
    <div>
      <Header />
      <h4>Welcome trainer!</h4>
      <p>Your habits train not only you, but your Pokémon. Together, you grow stronger and evolve towards greatness!</p>
      <Navbar onSelect={setCurrentPage} />
    </div>
  );
};

export default Home;
