// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

let users = [];

// Endpoint to serve user data (GET request)
app.get('/users', (req, res) => {
  res.json(users);
});

// Route to handle the addition of new users (POST request)
app.post('/users', (req, res) => {
  const { name, email, role } = req.body;

  // Basic server-side email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const newUser = { name, email, role };
  users.push(newUser);

  // Log the validated user data
  console.log('New user added:', newUser);

  res.json(newUser);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
