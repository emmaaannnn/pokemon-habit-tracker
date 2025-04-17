import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import { getUserPokemonParty } from '../services/api';
import '../styles/PokemonParty.css'; // Import CSS for styling

const PokemonParty = () => {
  const [party, setParty] = useState([]); // State to hold the fetched Pokémon party
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  const userId = localStorage.getItem('userId'); // Get userId from localStorage

  useEffect(() => {
    const fetchParty = async () => {
      try {
        // Fetch Pokémon party from the backend
        const data = await getUserPokemonParty(userId);
        setParty(data.party); // Set the fetched party data to state
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setError('Failed to load Pokémon Party. Please try again.');
        setLoading(false);
      }
    };

    fetchParty(); // Trigger fetching when component mounts
  }, [userId]);

  if (loading) {
    return <p>Loading your Pokémon Party...</p>; // Show loading state
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>; // Show error message
  }

  return (
    <div>
      {party.map((pokemon, index) => (
        <PokemonCard
          key={index}
          name={pokemon ? pokemon.name : 'Empty Slot'}
          level={pokemon ? pokemon.level : ''}
          xp={pokemon ? pokemon.xp : ''}
        />
      ))}
    </div>
  );
};

export default PokemonParty;