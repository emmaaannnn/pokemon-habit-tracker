// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// app.use(cors()); // Enable CORS
// app.use(express.json());

// app.get('/api/users', (req, res) => {
//     const users = JSON.parse(
//         fs.readFileSync(path.join(__dirname, 'data', 'users.json'))
//     );
//     res.json(users);
// });

// app.listen(5000, () => console.log('Backend running on http://localhost:5000'));


const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken'); // For generating tokens
const pokemonRoutes = require('./routes/pokemonRoutes.js');

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// GET users endpoint (already present)
app.get('/api/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'users.json')));
    res.json(users);
});

// POST login endpoint
app.post('/api/users/login', (req, res) => {
    const { username, password } = req.body; // Extract username and password from the request body

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
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', {
        expiresIn: '1h', // Token expiration time
    });

    // Respond with token and user details
    res.json({ token, userId: user.id, username: user.username });
});

// Connect Pokémon routes
app.use('/api/pokemon', pokemonRoutes);


const PORT = 5000;
app.listen(5000, () => console.log('Backend running on http://localhost:5000'));