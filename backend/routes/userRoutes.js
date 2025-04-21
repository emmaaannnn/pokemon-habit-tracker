const express = require('express');
const { register, login } = require('../controllers/userController');

const router = express.Router();

// Registration endpoint
router.post('/register', register);

// Login endpoint
router.post('/login', login);

module.exports = router;