// const { addUser, getAllUsers } = require('../models/userModel');
// const fs = require('fs');
// const path = require('path');

// const pokemonFilePath = path.resolve(__dirname, '../data/userPokemon.json');

// const register = (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required!' });
//   }

//   try {
//     const existingUsers = getAllUsers();
//     if (existingUsers.some((user) => user.username === username)) {
//       return res.status(409).json({ message: 'Username already in use!' });
//     }

//     // First, create the user
//     const newUser = addUser({ username, password });

//     // Then, retrieve or initialize Pokémon data
//     let pokemonData = fs.existsSync(pokemonFilePath)
//       ? JSON.parse(fs.readFileSync(pokemonFilePath, 'utf-8'))
//       : [];

//     // Create the new Pokémon entry
//     const newEntry = [{
//       userId: Number(newUser.userId),
//       party: [null, null, null, null, null, null],
//       storage: [],
//     }];

//     pokemonData.push(newEntry);

//     // Write to `userPokemon.json`
//     fs.writeFileSync(pokemonFilePath, JSON.stringify(pokemonData, null, 2));
    

//     res.status(201).json({ message: 'User registered successfully!', userId: newUser.userId });
//   } catch (error) {
//     console.error('Error registering user:', error.message);
//     res.status(500).json({ message: 'Failed to register user.' });
//   }
// };

const userModel = require('../models/userModel');
const fs = require('fs');
const path = require('path');

const pokemonFilePath = path.resolve(__dirname, '../data/userPokemon.json');

// Get all users
const getUsers = (req, res) => {
    try {
        const users = userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error.message);
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
};

// User login
const login = (req, res) => {
    const { username, password } = req.body;

    try {
        const user = userModel.findUser(username, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.json({ userId: user.userId, username: user.username });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// User registration
const register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required!' });
    }

    try {
        const existingUsers = userModel.getAllUsers();

        if (existingUsers.some((u) => u.username === username)) {
            return res.status(409).json({ message: 'Username already in use!' });
        }

        const newUser = userModel.addUser({ username, password });

        let pokemonData = fs.existsSync(pokemonFilePath)
        ? JSON.parse(fs.readFileSync(pokemonFilePath, 'utf-8'))
        : [];

        // Create the new Pokémon entry
        const newEntry = {
        userId: Number(newUser.userId),
        party: [null, null, null, null, null, null],
        storage: [],
        needsStarterSelection: true,
        };

        pokemonData.push(newEntry);

        // Write to `userPokemon.json`
        fs.writeFileSync(pokemonFilePath, JSON.stringify(pokemonData, null, 2));

        // Create a new habits JSON file for the user
        const habitsFilePath = path.join(__dirname, '../data/', `habits_user${newUser.userId}.json`);

        const defaultHabits = {
            habits: [null, null, null, null, null, null]
        };

        // Write the initial empty habits file
        fs.writeFileSync(habitsFilePath, JSON.stringify(defaultHabits, null, 2));
        

        res.status(201).json({ message: 'User registered successfully!', userId: newUser.userId });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

module.exports = { getUsers, login, register };