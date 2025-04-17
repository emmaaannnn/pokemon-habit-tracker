const { readPokemonData, writePokemonData } = require('../models/pokemonModel');

// Fetch the user's Pokémon party and storage
const getUserPokemon = (req, res) => {
  const { userId } = req.body;

  try {
    const data = readPokemonData();
    const userEntry = data.find((user) => user.userId === userId);

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
    const userEntry = data.find((user) => user.userId === userId);

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
    const userEntry = data.find((user) => user.userId === userId);

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

module.exports = { getUserPokemon, addPokemon, swapPokemon };