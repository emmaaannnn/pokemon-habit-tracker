const { getPokemonData } = require('../services/pokeApiService');

// Set Pokémon for a user
const setUserPokemon = async (req, res) => {
  const { userId, pokemonId } = req.body;

  try {
    // Fetch Pokémon data from the service
    const pokemon = await getPokemonData(pokemonId);

    // Simulate saving user-specific Pokémon (e.g., add level, XP tracking)
    const userPokemon = {
      userId,
      name: pokemon.name,
      sprite: pokemon.sprite,
      level: 1,
      xp: 0,
      baseExperience: pokemon.base_experience,
    };

    // Respond with the saved data (without storing locally for now)
    res.json(userPokemon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Pokémon data for a user
const getUserPokemon = async (req, res) => {
  const { pokemonId } = req.body;

  try {
    // Fetch Pokémon data directly from the service
    const pokemon = await getPokemonData(pokemonId);

    // Simulate user-specific logic (e.g., add XP/level data from frontend later)
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { setUserPokemon, getUserPokemon };