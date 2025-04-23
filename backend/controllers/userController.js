const { addUser, getAllUsers, addPokemonDataForUser } = require('../models/userModel');
const jwt = require('jsonwebtoken');

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

    // Generate a token
    const token = jwt.sign({ userId: user.userId, username: user.username }, 'your_jwt_secret', {
      expiresIn: '1h', // Token expiration time
    });

    res.json({ token, username: user.username, userId: user.userId });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };