const habits = require('../data/habits');
const pokemonData = require('../data/pokemon');

const getHabits = async (req, res) => {
  const { userId } = req.body;
  const userHabits = habits.filter((habit) => habit.userId === userId);

  res.json(userHabits);
};

const completeHabit = async (req, res) => {
  const { habitId, userId } = req.body;

  const habit = habits.find((h) => h.userId === userId && h.name === habitId);
  if (!habit) {
    return res.status(404).json({ message: 'Habit not found' });
  }

  habit.isCompleted = true;

  const userPokemon = pokemonData.find((pokemon) => pokemon.userId === userId);
  if (userPokemon) {
    userPokemon.xp += 10; // Increment XP
    if (userPokemon.xp >= userPokemon.levelToEvolve) {
      userPokemon.level += 1;
      userPokemon.xp = 0; // Reset XP
    }
  }

  res.json({ habit, userPokemon });
};

module.exports = { getHabits, completeHabit };