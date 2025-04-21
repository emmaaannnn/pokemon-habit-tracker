const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken'); // For generating tokens
const pokemonRoutes = require('./routes/pokemonRoutes.js');
const habitRoutes = require('./routes/habitRoutes.js');
const userRoutes = require('./routes/userRoutes.js'); // User routes


const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// GET all users endpoint
app.get('/api/users', (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'users.json')));
        res.json(users);
    } catch (error) {
        console.error('Error reading users file:', error.message);
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
});

// POST login endpoint
app.post('/api/users/login', (req, res) => {
    const { username, password } = req.body; // Extract username and password from the request body

    try {
        // Read users from JSON file
        const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'users.json')));

        // Find the user with matching username and password
        const user = users.find(
            (u) => u.username === username && u.password === password
        );

        if (!user) {
            // User not found or credentials invalid
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a token for the user
        const token = jwt.sign({ userId: user.userId, username: user.username }, 'your_jwt_secret', {
            expiresIn: '1h', // Token expiration time
        });

        // Respond with token and user details
        res.json({ token, userId: user.userId, username: user.username });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// POST register endpoint
app.post('/api/users/register', (req, res) => {
    const { username, password} = req.body; // Extract user details from the request body

    if (!username || !password) {
        return res.status(400).json({ message: 'Username, password are required!' });
    }

    try {
        const usersFilePath = path.join(__dirname, 'data', 'users.json');
        let users = [];

        // Load existing users
        if (fs.existsSync(usersFilePath)) {
            users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        }

        // Check for duplicate username
        const isUsernameTaken = users.some((u) => u.username === username);

        if (isUsernameTaken ) {
            return res.status(409).json({ message: 'Username  already in use!' });
        }

        // Add the new user
        const newUserId = users.length ? users[users.length - 1].userId + 1 : 1; // Auto-increment userId
        const newUser = { userId: newUserId, username, password };
        users.push(newUser);

        // Save updated users list to file
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        // Respond with success
        res.status(201).json({ message: 'User registered successfully!', userId: newUserId });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
});


// Pokémon routes
app.use('/api/pokemon', pokemonRoutes);

// Habit routes
app.use('/api/users', habitRoutes);


const PORT = 5000;
app.listen(5000, () => console.log('Backend running on http://localhost:5000'));