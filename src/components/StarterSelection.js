import React, { useState } from 'react';
import { selectStarterPokemon } from '../services/api'; // API call to save starter choice
import { useNavigate } from 'react-router-dom';

const StarterSelection = ({ userId }) => {
  const navigate = useNavigate();
  const [selectedStarter, setSelectedStarter] = useState(null);

  const starters = [
    { name: 'Bulbasaur', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { name: 'Charmander', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    { name: 'Squirtle', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' }
  ];

  const handleSelectStarter = async () => {
    if (!selectedStarter) return;

    try {
      const data = await selectStarterPokemon(userId, selectedStarter);
      console.log('Starter Selected:', data);
      navigate('/home'); // Redirect to home screen after selection
    } catch (error) {
      console.error('Failed to select starter:', error);
    }
  };

  return (
    <div className="StarterSelection">
      <h1>Choose Your Starter Pokémon</h1>
      <div className="StarterOptions">
        {starters.map((pokemon) => (
          <button key={pokemon.name} onClick={() => setSelectedStarter(pokemon.name)} className={selectedStarter === pokemon.name ? "selected" : ""}>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </button>
        ))}
      </div>
      <button onClick={handleSelectStarter} disabled={!selectedStarter}>
        Confirm Starter
      </button>
    </div>
  );
};

export default StarterSelection;