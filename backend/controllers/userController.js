const { readData } = require('../utils/fileHandler');
const jwt = require('jsonwebtoken');

// Login controller
const login = (req, res) => {
  const { username, password } = req.body;

  try {
    // Read users from JSON file
    const users = readData('users.json');

    // Find a matching user
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a token
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.json({ token, username: user.username, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };