import React, { useEffect, useState } from 'react';
import { getUserPokemonParty } from '../services/api';
import { getPokemonDetails } from '../services/pokeApiService';

const PokemonStorage = () => {
  const [storage, setStorage] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); 

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchStorageWithDetails = async () => {
      try {
        const data = await getUserPokemonParty(userId);

        // Fetch additional details for each Pokémon using their names
        const detailedStorage = await Promise.all(
          data.storage.map(async (pokemon) => {
            if (pokemon) {
              const details = await getPokemonDetails(pokemon.name); // Fetch details from PokéAPI
              return {
                ...pokemon, // Retain original storage info
                sprite: details.sprite,
              };
            }
            return null; // Keep empty slots as null
          })
        );

        setStorage(detailedStorage); // Set enriched data to state
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setError('Failed to load Pokémon Storage details. Please try again.');
        setLoading(false);
      }
    };

    fetchStorageWithDetails(); // Trigger fetching when component mounts
  }
  , [userId]);

  if (loading) {
    return <p>Loading your Pokémon Storage...</p>; // Show loading state
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>; // Show error message
  }

  return (
    <div className="PokemonStorage">
      <div className="PokemonGrid">
        {/* Generate 30 slots, filling with Pokémon or placeholders */}
        {Array.from({ length: 30 }).map((_, index) => {
          const pokemon = storage[index]; // Get the Pokémon or null for the slot
          return (
            <div className="PokemonSlot" key={index}>
              {pokemon ? (
                <>
                  <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="PokemonImage"
                  />
                  <p>{pokemon.name}</p>
                </>
              ) : (
                <p></p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
  

  
};

export default PokemonStorage;