const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

app.get('/api/users', (req, res) => {
    const users = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'data', 'users.json'))
    );
    res.json(users);
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));