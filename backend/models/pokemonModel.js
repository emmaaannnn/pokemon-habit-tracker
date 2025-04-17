const fs = require('fs');
const path = require('path');

// Read JSON data from userPokemon.json
const readPokemonData = () => {
  const filepath = path.resolve(__dirname, '../data/userPokemon.json');
  const data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data);
};

// Write JSON data to userPokemon.json
const writePokemonData = (content) => {
  const filepath = path.resolve(__dirname, '../data/userPokemon.json');
  fs.writeFileSync(filepath, JSON.stringify(content, null, 2));
};

module.exports = { readPokemonData, writePokemonData };
