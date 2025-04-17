import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend base URL
});

// Fetch user's Pokémon party
export const getUserPokemonParty = async (userId) => {
  try {
    const response = await API.post('/pokemon/get', { userId });
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon party:', error);
    throw error;
  }
};