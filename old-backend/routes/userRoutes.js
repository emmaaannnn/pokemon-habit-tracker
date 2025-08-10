const express = require('express');
const { getUsers, register, login } = require('../controllers/userController');

const router = express.Router();

// Routes
router.get('/', getUsers);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
