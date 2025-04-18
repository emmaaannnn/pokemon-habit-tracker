const express = require('express');
const { getUserPokemon, addPokemon, swapPokemon } = require('../controllers/pokemonController');
const { getPokemonData } = require('../controllers/pokemonController');


const router = express.Router();

// Fetch Pokémon party and storage
router.post('/get', getUserPokemon);

// Add Pokémon to party or storage
router.post('/add', addPokemon);

// Swap Pokémon between party and storage
router.post('/swap', swapPokemon);

// Route to get Pokémon details from PokéAPI
router.get('/details/:pokemonName', getPokemonData);


module.exports = router;