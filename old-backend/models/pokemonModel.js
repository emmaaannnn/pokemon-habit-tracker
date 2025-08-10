const fs = require('fs');
const path = require('path');

// Read JSON data from userPokemon.json
const readPokemonData = () => {
  const filepath = path.resolve(__dirname, '../data/userPokemon.json');
  if (!fs.existsSync(filepath)) {
    console.log("Creating userPokemon.json...");
    fs.writeFileSync(filepath, JSON.stringify([], null, 2)); // Initialize with empty array
  }
  const data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data);
};


// Write JSON data to userPokemon.json
const writePokemonData = (content) => {
  const filepath = path.resolve(__dirname, '../data/userPokemon.json');
  console.log("Writing to userPokemon.json...");
  fs.writeFileSync(filepath, JSON.stringify(content, null, 2));
  console.log("Successfully wrote to userPokemon.json!");
};

module.exports = { readPokemonData, writePokemonData };
