const axios = require('axios');

// Fetch Pokémon data from PokeAPI by ID or Name
const getPokemonData = async (identifier) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
    const pokemon = response.data;

    // Extract the necessary details
    return {
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      base_experience: pokemon.base_experience, // Example data
      height: pokemon.height, // Example data
    };
  } catch (error) {
    console.error('Error fetching Pokémon data:', error.message);
    throw new Error('Could not retrieve Pokémon data');
  }
};

module.exports = { getPokemonData };