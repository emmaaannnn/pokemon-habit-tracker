const { readData, writeData } = require('../utils/fileHandler');
const { getPokemonData } = require('../services/pokeApiService');

// Add Pokémon to a user's party or storage
const setUserPokemon = async (req, res) => {
  const { userId, pokemonId } = req.body;

  try {
    // Fetch Pokémon data from PokeAPI
    const pokemonData = await getPokemonData(pokemonId);
    const newPokemon = {
      name: pokemonData.name,
      level: 1,
      xp: 0,
    };

    // Read current user Pokémon data
    const userPokemon = readData('userPokemon.json');
    const userEntry = userPokemon.find((entry) => entry.userId === userId);

    if (!userEntry) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if there's an empty slot in the party
    const emptySlotIndex = userEntry.party.findIndex((slot) => slot === null);

    if (emptySlotIndex !== -1) {
      // Add Pokémon to the party
      userEntry.party[emptySlotIndex] = newPokemon;
    } else {
      // Add Pokémon to storage
      userEntry.storage.push(newPokemon);
    }

    // Write updated data to JSON
    writeData('userPokemon.json', userPokemon);

    res.json({ message: 'Pokémon added successfully', userPokemon: userEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Swap a Pokémon between party and storage
const swapPokemon = (req, res) => {
  const { userId, partyIndex, storageIndex } = req.body;

  try {
    // Read current user Pokémon data
    const userPokemon = readData('userPokemon.json');
    const userEntry = userPokemon.find((entry) => entry.userId === userId);

    if (!userEntry) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate partyIndex and storageIndex
    if (partyIndex < 0 || partyIndex >= userEntry.party.length) {
      return res.status(400).json({ message: 'Invalid party index' });
    }
    if (storageIndex < 0 || storageIndex >= userEntry.storage.length) {
      return res.status(400).json({ message: 'Invalid storage index' });
    }

    // Perform swap
    const partyPokemon = userEntry.party[partyIndex];
    const storagePokemon = userEntry.storage[storageIndex];

    userEntry.party[partyIndex] = storagePokemon;
    userEntry.storage[storageIndex] = partyPokemon;

    // Write updated data to JSON
    writeData('userPokemon.json', userPokemon);

    res.json({ message: 'Pokémon swapped successfully', userPokemon: userEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { setUserPokemon, swapPokemon };