const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  isCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Habit', habitSchema);
