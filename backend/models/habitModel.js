const fs = require('fs');
const path = require('path');

// Get the file path for the user's habit data
const getUserHabitFilePath = (userId) => {
  return path.resolve(__dirname, `../data/habits_user${userId}.json`);
};

// Fetch habits for a specific user
const getHabitsForUser = (userId) => {
  const filePath = getUserHabitFilePath(userId);

  if (!fs.existsSync(filePath)) {
    return { userId, habits: [] }; // Default structure if the file doesn't exist
  }

  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Save updated habits for a specific user
const saveHabitsForUser = (userId, habitData) => {
  const filePath = getUserHabitFilePath(userId);
  fs.writeFileSync(filePath, JSON.stringify(habitData, null, 2));
};

module.exports = { getHabitsForUser, saveHabitsForUser };