import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/pokemon'; // Adjust the backend URL if needed

// Fetch Pokémon details by name
export const getPokemonDetails = async (pokemonName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/details/${pokemonName}`);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error(`Error fetching details for ${pokemonName}:`, error);
    throw new Error('Failed to fetch Pokémon details.');
  }
};