const axios = require('axios');

// Function to fetch Pokémon details from the PokéAPI
const getPokemonDetails = async (pokemonName) => {
  try {
    // Fetch data from the PokéAPI
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    const data = response.data;

    // Extract necessary details
    const levelToEvolve = getEvolutionLevel(pokemonName); // Placeholder for evolution level (handled below)
    const sprite = data.sprites.front_default; // Front-facing PNG image of the Pokémon
    const xpToLevelUp = data.base_experience; // Base experience for leveling up

    // Return extracted data
    return {
      name: pokemonName,
      levelToEvolve: levelToEvolve,
      sprite: sprite,
      xpToLevelUp: xpToLevelUp
    };
  } catch (error) {
    console.error(`Error fetching Pokémon details for ${pokemonName}:`, error.message);
    throw new Error('Failed to fetch Pokémon details.');
  }
};

// Function to determine the level a Pokémon evolves (simplified example)
const getEvolutionLevel = (pokemonName) => {
  // Placeholder logic: In a real implementation, you may need to call the evolution chain API endpoint
  const evolutionLevels = {
    bulbasaur: 16,
    charmander: 16,
    squirtle: 16,
    pikachu: 22, // Example values, customize based on your logic
  };

  return evolutionLevels[pokemonName.toLowerCase()] || 'Unknown'; // Default to 'Unknown' if not in the list
};

module.exports = { getPokemonDetails };