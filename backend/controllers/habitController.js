const { getHabitsForUser, saveHabitsForUser } = require('../models/habitModel.js');

// Fetch habits for a specific user
const fetchUserHabits = (req, res) => {
  const { userId } = req.params;

  try {
    const userData = getHabitsForUser(userId);
    res.json(userData);
  } catch (error) {
    console.error('Error fetching habits:', error.message);
    res.status(500).json({ message: 'Failed to fetch user habits' });
  }
};

// Add or update a habit for a user
const updateHabit = (req, res) => {
  const { userId } = req.params;
  const { habitId, name, linkedPokemon, streak, xpReward, completionHistory } = req.body;

  try {
    const userData = getHabitsForUser(userId);

    const habitIndex = userData.habits.findIndex((habit) => habit.habitId === habitId);

    if (habitIndex >= 0) {
      userData.habits[habitIndex] = { habitId, name, linkedPokemon, streak, xpReward, completionHistory };
    } else {
      userData.habits.push({ habitId, name, linkedPokemon, streak, xpReward, completionHistory });
    }

    saveHabitsForUser(userId, userData);
    res.json(userData.habits);
  } catch (error) {
    console.error('Error updating habit:', error.message);
    res.status(500).json({ message: 'Failed to update habit' });
  }
};

// const updateHabit = (req, res) => {
//   const { userId } = req.params;
//   const { habitId, date } = req.body;

//   if (!userId) {
//     console.error('User ID is missing in request!');
//     return res.status(400).json({ message: 'User ID is required' });
//   }

//   const userData = getHabitsForUser(userId);
//   const habit = userData.habits.find((h) => h?.habitId === parseInt(habitId));

//   if (!habit) {
//     console.error(`Habit not found: habitId=${habitId}, userId=${userId}`);
//     return res.status(404).json({ message: 'Habit not found' });
//   }

//   habit.completionHistory.daily[date] = true;
//   saveHabitsForUser(userId, userData);

//   res.json({ message: 'Habit updated successfully', habit });
// };

// Delete a habit for a user
const deleteHabit = (req, res) => {
  const { userId, habitId } = req.params;

  try {
    const userData = getHabitsForUser(userId);
    userData.habits = userData.habits.filter((habit) => habit.habitId !== parseInt(habitId));
    saveHabitsForUser(userId, userData);
    res.json(userData.habits);
  } catch (error) {
    console.error('Error deleting habit:', error.message);
    res.status(500).json({ message: 'Failed to delete habit' });
  }
};

module.exports = { fetchUserHabits, updateHabit, deleteHabit };