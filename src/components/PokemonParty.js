import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import { getUserPokemonParty } from '../services/api';
import { getPokemonDetails } from '../services/pokeApiService';
import '../styles/PokemonParty.css'; // Import CSS for styling

const PokemonParty = () => {
  const [party, setParty] = useState([]); // State to hold the fetched Pokémon party
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  const userId = localStorage.getItem('userId'); // Get userId from localStorage

  useEffect(() => {
    const fetchPartyWithDetails = async () => {
      try {
        // Fetch Pokémon party from the backend
        const data = await getUserPokemonParty(userId);

        // Fetch additional details for each Pokémon using their names
        const detailedParty = await Promise.all(
          data.party.map(async (pokemon) => {
            if (pokemon) {
              const details = await getPokemonDetails(pokemon.name); // Fetch details from PokéAPI
              return {
                ...pokemon, // Retain original party info
                sprite: details.sprite,
                levelToEvolve: details.levelToEvolve,
                xpToLevelUp: details.xpToLevelUp,
              };
            }
            return null; // Keep empty slots as null
          })
        );

        setParty(detailedParty); // Set enriched data to state
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setError('Failed to load Pokémon Party details. Please try again.');
        setLoading(false);
      }
    };

    fetchPartyWithDetails(); // Trigger fetching when component mounts
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
          sprite={pokemon ? pokemon.sprite : ''}
          level={pokemon ? pokemon.level : ''}
          xp={pokemon ? pokemon.xp : ''}
        />
      ))}
    </div>
  );
};

export default PokemonParty;