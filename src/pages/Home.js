import React from 'react';
import Navbar from '../components/NavBar.js';
import Header from '../components/Header';
import PokemonParty from '../components/PokemonParty.js';
import '../styles/Home.css';
import HabitWeeklyList from '../components/HabitWeeklyList.js';



const Home = ({ setCurrentPage }) => {
  const userId = localStorage.getItem('userId');

  return (
    <div className='HomeScreen'>
      <Header/>
      <Navbar onSelect={setCurrentPage} />
      <div className='NavbarMessage'>
        <h4>Welcome trainer!</h4>
        <p>Your habits train not only you, but your Pokémon. Together, you grow stronger and evolve towards greatness!</p>
      </div>

      <h1 className='HomeTitle'>Your Pokémon Party</h1>

      <div className='PartySection'>
        <PokemonParty/>
      </div>
      <div className='HabitSection'>
        <HabitWeeklyList userId={userId} />
      </div>
    </div>
  );
};

export default Home;
