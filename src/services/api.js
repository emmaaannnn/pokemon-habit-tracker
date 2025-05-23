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

// User registration
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/register', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
};

// Select a starter Pokémon for the user
export const selectStarterPokemon = async (userId, starterPokemon) => {
  try {
    const response = await API.post('/pokemon/select-starter', { userId, starterPokemon });
    return response.data; // Updated party data after selecting a starter
  } catch (error) {
    console.error('Error selecting starter Pokémon:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to select starter Pokémon');
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

// Fetch user's habits
export const fetchUserHabits = async (userId) => {
  try {
    const response = await API.get(`/habits/${userId}/habits`);
    return response.data; // Returns the user's habit data
  } catch (error) {
    console.error('Error fetching habits:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch user habits');
  }
};

// Add or update a habit for the user
export const updateHabit = async (userId, habitData) => {
  try {
    const response = await API.post(`/habits/${userId}/habits`, habitData);
    return response.data; // Updated habit data
  } catch (error) {
    console.error('Error updating habit:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update habit');
  }
};

// Delete a habit for the user
export const deleteHabit = async (userId, habitId) => {
  try {
    const response = await API.delete(`/habits/${userId}/habits/${habitId}`);
    return response.data; // Remaining habits after deletion
  } catch (error) {
    console.error('Error deleting habit:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete habit');
  }
};
