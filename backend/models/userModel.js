// const fs = require('fs');
// const path = require('path');

// // Path to users.json
// const usersFilePath = path.resolve(__dirname, '../data/users.json');

// // Get all users
// const getAllUsers = () => {
//   if (!fs.existsSync(usersFilePath)) {
//     return []; // Return an empty array if the file doesn't exist
//   }
//   const data = fs.readFileSync(usersFilePath, 'utf-8');
//   return JSON.parse(data);
// };

// // Save users to file
// const saveUsers = (users) => {
//   fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
// };

// // Add a new user
// const addUser = (userData) => {
//   const users = getAllUsers();
  
//   // Ensure userId is numeric
//   const lastUserId = users.length ? Number(users[users.length - 1].userId) : 0; // Convert to number
//   const newUserId = lastUserId + 1; // Increment userId

//   const newUser = { userId: newUserId, ...userData };
//   users.push(newUser);
//   saveUsers(users);
//   return newUser;
// };

// module.exports = { getAllUsers, saveUsers, addUser };

const fs = require('fs');
const path = require('path');

const usersFilePath = path.resolve(__dirname, '../data/users.json');

// Get all users
const getAllUsers = () => {
    if (!fs.existsSync(usersFilePath)) {
        return []; // Return an empty array if the file doesn't exist
    }
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
};

// Save users to file
const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Add a new user
const addUser = ({ username, password }) => {
    const users = getAllUsers();

    // Ensure the user ID is unique
    const newUserId = users.length ? users[users.length - 1].userId + 1 : 1;

    const newUser = { userId: newUserId, username, password };
    users.push(newUser);
    saveUsers(users);

    return newUser;
};

// Find user by username and password (for login)
const findUser = (username, password) => {
    const users = getAllUsers();
    return users.find((u) => u.username === username && u.password === password);
};

module.exports = { getAllUsers, saveUsers, addUser, findUser };