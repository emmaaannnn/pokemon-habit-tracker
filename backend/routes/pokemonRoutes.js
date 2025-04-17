const express = require('express');
const { addPokemon, swapPokemon } = require('../controllers/pokemonController');
const router = express.Router();

router.post('/add', addPokemon); // Add Pokémon to party or storage
router.post('/swap', swapPokemon); // Swap Pokémon between party and storage

module.exports = router;
