const users = require('../data/users');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const userExists = users.find((user) => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: (users.length + 1).toString(),
    email,
    password, // In a real scenario, this should be hashed
    token: null,
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = `token-${user.id}`; // Simulated token
  user.token = token;

  res.json({ token });
};

module.exports = { signup, login };