const { addUser, getAllUsers } = require('../models/userModel');
const fs = require('fs');
const path = require('path');

const pokemonFilePath = path.resolve(__dirname, '../data/userPokemon.json');

// // Controller to register a new user
// const register = (req, res) => {
//   const { username, password } = req.body;

//   // Validate input
//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required!' });
//   }

//   try {
//     const existingUsers = getAllUsers();

//     // Check if username already exists
//     const isUsernameTaken = existingUsers.some((user) => user.username === username);

//     if (isUsernameTaken) {
//       return res.status(409).json({ message: 'Username already in use!' });
//     }

//     // Add new user to JSON file
//     const newUser = addUser({ username, password });
  
//     // Then, retrieve or initialize Pokémon data
//     let pokemonData = fs.existsSync(pokemonFilePath)
//       ? JSON.parse(fs.readFileSync(pokemonFilePath, 'utf-8'))
//       : [];

//     // Add the new user's data to the Pokémon file
//     const newEntry = {
//       userId: Number(newUser.userId), // Ensure userId is numeric
//       party: [null, null, null, null, null, null], // Default empty party
//       storage: [] // Default empty storage
//     };

//     pokemonData.push(newEntry);

//     // Write to userPokemon.json
//     console.log("Writing to userPokemon.json...");
//     fs.writeFileSync(pokemonFilePath, JSON.stringify(pokemonData, null, 2));
//     console.log("Successfully wrote to userPokemon.json!");

//     res.status(201).json({ message: 'User registered successfully!', userId: newUser.userId });
//   } catch (error) {
//     console.error('Error registering user:', error.message);
//     res.status(500).json({ message: 'Failed to register user.' });
//   }
// };

const register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required!' });
  }

  try {
    const existingUsers = getAllUsers();
    if (existingUsers.some((user) => user.username === username)) {
      return res.status(409).json({ message: 'Username already in use!' });
    }

    // First, create the user
    const newUser = addUser({ username, password });

    // Then, retrieve or initialize Pokémon data
    let pokemonData = fs.existsSync(pokemonFilePath)
      ? JSON.parse(fs.readFileSync(pokemonFilePath, 'utf-8'))
      : [];

    // Create the new Pokémon entry
    const newEntry = [{
      userId: Number(newUser.userId),
      party: [null, null, null, null, null, null],
      storage: [],
    }];

    pokemonData.push(newEntry);

    // Write to `userPokemon.json`
    fs.writeFileSync(pokemonFilePath, JSON.stringify(pokemonData, null, 2));
    

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

// GET all users endpoint
// app.get('/api/users', (req, res) => {
//     try {
//         const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'users.json')));
//         res.json(users);
//     } catch (error) {
//         console.error('Error reading users file:', error.message);
//         res.status(500).json({ message: 'Failed to retrieve users' });
//     }
// });

// // POST login endpoint
// app.post('/api/users/login', (req, res) => {
//     const { username, password } = req.body; // Extract username and password from the request body

//     try {
//         // Read users from JSON file
//         const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'users.json')));

//         // Find the user with matching username and password
//         const user = users.find(
//             (u) => u.username === username && u.password === password
//         );

//         if (!user) {
//             // User not found or credentials invalid
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         // Respond with user details
//         res.json({ userId: user.userId, username: user.username });
//     } catch (error) {
//         console.error('Error during login:', error.message);
//         res.status(500).json({ message: 'Server error during login' });
//     }
// });

// // POST register endpoint
// app.post('/api/users/register', (req, res) => {
//     const { username, password} = req.body; // Extract user details from the request body

//     if (!username || !password) {
//         return res.status(400).json({ message: 'Username, password are required!' });
//     }

//     try {
//         const usersFilePath = path.join(__dirname, 'data', 'users.json');
//         let users = [];

//         // Load existing users
//         if (fs.existsSync(usersFilePath)) {
//             users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
//         }

//         // Check for duplicate username
//         const isUsernameTaken = users.some((u) => u.username === username);

//         if (isUsernameTaken ) {
//             return res.status(409).json({ message: 'Username  already in use!' });
//         }

//         // Add the new user
//         const newUserId = users.length ? users[users.length - 1].userId + 1 : 1; // Auto-increment userId
//         const newUser = { userId: newUserId, username, password };
//         users.push(newUser);

//         // Save updated users list to file
//         fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

//         // Respond with success
//         res.status(201).json({ message: 'User registered successfully!', userId: newUserId });
//     } catch (error) {
//         console.error('Error during registration:', error.message);
//         res.status(500).json({ message: 'Server error during registration' });
//     }
// });

module.exports = { register, login };