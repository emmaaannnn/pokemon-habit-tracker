const express = require('express');
const { fetchUserHabits, updateHabit, deleteHabit } = require('../controllers/habitController');

const router = express.Router();

// Route to fetch habits for a user
router.get('/:userId/habits', fetchUserHabits);

// Route to add or update a habit
router.post('/:userId/habits', updateHabit);

// Route to delete a habit
router.delete('/:userId/habits/:habitId', deleteHabit);

module.exports = router;