const { readPokemonData, writePokemonData } = require('../models/pokemonModel');
const { getPokemonDetails } = require('../services/pokeApiService');

// Select a starter Pokémon for the user
const selectStarterPokemon = (req, res) => {
  const { userId, starterPokemon } = req.body;

  if (!userId || !starterPokemon) {
    return res.status(400).json({ message: 'User ID and starter Pokémon are required!' });
  }

  try {
    const data = readPokemonData();
    const userEntry = data.find((user) => user.userId === Number(userId));

    if (!userEntry) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!userEntry.party.every((slot) => slot === null)) {
      return res.status(400).json({ message: 'User has already selected a starter' });
    }

    // Assign starter Pokémon to the first slot in their party
    userEntry.party[0] = {
      name: starterPokemon,
      level: 5,
      xp: 0,
    };

    // Save the updated data
    writePokemonData(data);

    res.status(200).json({ message: 'Starter Pokémon selected successfully!', party: userEntry.party });
  } catch (error) {
    console.error('Error selecting starter Pokémon:', error.message);
    res.status(500).json({ message: 'Server error during starter selection' });
  }
};

// Endpoint to get detailed Pokémon data
const getPokemonData = async (req, res) => {
  const { pokemonName } = req.params;

  try {
    const pokemonDetails = await getPokemonDetails(pokemonName);
    res.json(pokemonDetails);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Pokémon data' });
  }
};

// Fetch the user's Pokémon party and storage
const getUserPokemon = (req, res) => {
  const { userId } = req.body;

  try {
    const data = readPokemonData();
    const userEntry = data.find((user) => user.userId === Number(userId));

    if (!userEntry) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ party: userEntry.party, storage: userEntry.storage });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user Pokémon data' });
  }
};

// Add a new Pokémon to the party or storage
const addPokemon = (req, res) => {
  const { userId, name, level, xp } = req.body;

  try {
    const data = readPokemonData();
    const userEntry = data.find((user) => user.userId === Number(userId));

    if (!userEntry) {
      return res.status(404).json({ message: 'User not found' });
    }

    const emptySlotIndex = userEntry.party.findIndex((slot) => slot === null);

    if (emptySlotIndex !== -1) {
      // Add Pokémon to the party
      userEntry.party[emptySlotIndex] = { name, level, xp };
    } else {
      // Add Pokémon to storage
      userEntry.storage.push({ name, level, xp });
    }

    writePokemonData(data);
    res.json({ message: 'Pokémon added successfully', userEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error adding Pokémon' });
  }
};

// Swap Pokémon between party and storage
const swapPokemon = (req, res) => {
  const { userId, partyIndex, storageIndex } = req.body;

  try {
    const data = readPokemonData();
    const userEntry = data.find((user) => user.userId === Number(userId));

    if (!userEntry) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate indices
    if (partyIndex < 0 || partyIndex >= userEntry.party.length) {
      return res.status(400).json({ message: 'Invalid party index' });
    }
    if (storageIndex < 0 || storageIndex >= userEntry.storage.length) {
      return res.status(400).json({ message: 'Invalid storage index' });
    }

    // Perform the swap
    const partyPokemon = userEntry.party[partyIndex];
    const storagePokemon = userEntry.storage[storageIndex];

    userEntry.party[partyIndex] = storagePokemon;
    userEntry.storage[storageIndex] = partyPokemon;

    writePokemonData(data);
    res.json({ message: 'Pokémon swapped successfully', userEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error swapping Pokémon' });
  }
};

module.exports = { getUserPokemon, addPokemon, swapPokemon, getPokemonData, selectStarterPokemon };