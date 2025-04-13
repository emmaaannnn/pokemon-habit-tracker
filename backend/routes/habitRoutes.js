const express = require('express');
const { getHabits, completeHabit } = require('../controllers/habitController');
const router = express.Router();

router.get('/', getHabits);
router.put('/complete', completeHabit);

module.exports = router;
