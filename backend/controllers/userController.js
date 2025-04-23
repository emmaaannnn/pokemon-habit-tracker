const { addUser, getAllUsers } = require('../models/userModel');
const fs = require('fs');
const path = require('path');

const pokemonFilePath = path.resolve(__dirname, '../data/userPokemon.json');

// Controller to register a new user
const register = (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required!' });
  }

  try {
    const existingUsers = getAllUsers();

    // Check if username already exists
    const isUsernameTaken = existingUsers.some((user) => user.username === username);

    if (isUsernameTaken) {
      return res.status(409).json({ message: 'Username already in use!' });
    }

    // Add new user to JSON file
    const newUser = addUser({ username, password });

    // Add Pokemon Party and Storage for the new user
    const addPokemonDataForUser = (userId) => {
      let pokemonData = [];
      if (fs.existsSync(pokemonFilePath)) {
        pokemonData = JSON.parse(fs.readFileSync(pokemonFilePath, 'utf-8'));
      } else {
        fs.writeFileSync(pokemonFilePath, JSON.stringify([], null, 2)); // Initialize the file
        pokemonData = [];
      }

      // Add the new user's data to the Pokémon file
      const newEntry = {
        userId: Number(userId), // Ensure userId is numeric
        party: [null, null, null, null, null, null], // Default empty party
        storage: [] // Default empty storage
      };

      console.log('Adding new entry to userPokemon.json:', newEntry);
      pokemonData.push(newEntry);
      fs.writeFileSync(pokemonFilePath, JSON.stringify(pokemonData, null, 2));
      console.log('Successfully updated userPokemon.json!');
    };

    addPokemonDataForUser(newUser.userId);

    res.status(201).json({ message: 'User registered successfully!', userId: newUser.userId });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Failed to register user.' });
  }
};

// Controller to log in a user
const login = (req, res) => {
  const { username, password } = req.body;

  try {
    const users = getAllUsers();

    // Find a matching user
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ token, username: user.username, userId: user.userId });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };