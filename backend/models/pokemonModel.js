const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  sprite: { type: String, required: true },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  levelToEvolve: { type: Number, required: true },
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
