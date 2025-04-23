const fs = require('fs');
const path = require('path');

// Path to users.json
const usersFilePath = path.resolve(__dirname, '../data/users.json');

// Get all users
const getAllUsers = () => {
  if (!fs.existsSync(usersFilePath)) {
    return []; // Return an empty array if the file doesn't exist
  }
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data);
};

// Save users to file
const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Add a new user
const addUser = (userData) => {
  const users = getAllUsers();
  const newUserId = users.length ? Number(users[users.length - 1].userId) + 1 : 1; // Auto-increment userId
  console.log('New User ID:', newUser.userId);

  const newUser = { userId: newUserId, ...userData };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

// Write default Pokémon data to userPokemon.json
const addPokemonDataForUser = (userId) => {
  let pokemonData = [];
  if (fs.existsSync(pokemonFilePath)) {
    pokemonData = JSON.parse(fs.readFileSync(pokemonFilePath, 'utf-8'));
  } else {
    fs.writeFileSync(pokemonFilePath, JSON.stringify([], null, 2)); // Initialize the file
  }
  pokemonData.push({
    userId: userId,
    party: [null, null, null, null, null, null], // Default empty party
    storage: [] // Default empty storage
  });
  fs.writeFileSync(pokemonFilePath, JSON.stringify(pokemonData, null, 2));
  console.log('Successfully updated userPokemon.json!');
};


module.exports = { getAllUsers, saveUsers, addUser, addPokemonDataForUser };