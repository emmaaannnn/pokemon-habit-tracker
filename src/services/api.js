import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend's base URL
});

// User login
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};


// Fetch user's Pokémon party
export const getUserPokemonParty = async (userId) => {
  try {
    const response = await API.post('/pokemon/get', { userId });
    return response.data; // Returns the user's party array
  } catch (error) {
    console.error('Error fetching Pokémon party:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch Pokémon party');
  }
};