// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api', // Your backend base URL
// });

// // Fetch Pokémon for a user
// export const getUserPokemon = async (userId) => {
//   try {
//     const response = await API.post('/pokemon/get', { userId });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching Pokémon:', error);
//     throw error;
//   }
// };

// // Set Pokémon for a user
// export const setUserPokemon = async (userId, pokemonId) => {
//   try {
//     const response = await API.post('/pokemon/set', { userId, pokemonId });
//     return response.data;
//   } catch (error) {
//     console.error('Error setting Pokémon:', error);
//     throw error;
//   }
// };