const express = require('express');
const { setUserPokemon, getUserPokemon } = require('../controllers/pokemonController');
const router = express.Router();

router.post('/set', setUserPokemon); // Set Pokémon for user
router.get('/get', getUserPokemon); // Get Pokémon data

module.exports = router;