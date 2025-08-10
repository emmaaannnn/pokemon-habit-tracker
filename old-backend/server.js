const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pokemonRoutes = require('./routes/pokemonRoutes.js');
const habitRoutes = require('./routes/habitRoutes.js');
const userRoutes = require('./routes/userRoutes.js');


const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Use imported routes
app.use('/api/users', userRoutes); // Mount user routes
app.use('/api/pokemon', pokemonRoutes); // Mount Pokémon routes
app.use('/api/habits', habitRoutes); // Mount Habit routes



const PORT = 5000;
app.listen(5000, () => console.log('Backend running on http://localhost:5000'));