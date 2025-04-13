const userPokemon = require('../data/userPokemon');
const { getPokemonData } = require('../services/pokeApiService');

// Set Pokémon for a user
const setUserPokemon = async (req, res) => {
  const { userId, pokemonId } = req.body;

  try {
    // Fetch Pokémon data from PokeAPI
    const pokemon = await getPokemonData(pokemonId);

    // Check if user already has a Pokémon
    const existingPokemon = userPokemon.find((entry) => entry.userId === userId);

    if (existingPokemon) {
      // Update their Pokémon data
      existingPokemon.pokemon = {
        ...existingPokemon.pokemon,
        name: pokemon.name,
        sprite: pokemon.sprite,
        level: 1,
        xp: 0,
        levelToEvolve: 16, // Example level
      };
    } else {
      // Add new Pokémon for the user
      userPokemon.push({
        userId,
        pokemon: {
          name: pokemon.name,
          sprite: pokemon.sprite,
          level: 1,
          xp: 0,
          levelToEvolve: 16,
        },
      });
    }

    res.json({ message: "Pokémon set successfully", pokemon });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userPokemon = require('../data/userPokemon');

// Get Pokémon for a user
const getUserPokemon = async (req, res) => {
  const { userId } = req.body;

  const userEntry = userPokemon.find((entry) => entry.userId === userId);

  if (!userEntry) {
    return res.status(404).json({ message: "No Pokémon found for this user" });
  }

  res.json(userEntry.pokemon);
};