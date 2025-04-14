const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')));
    res.json(users);
});

module.exports = router;