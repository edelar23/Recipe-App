const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Create or connect to the SQLite database
const db = new sqlite3.Database('users.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Implement your API endpoints for user authentication, etc.
// These endpoints will handle interactions with the SQLite database.

// Inside the /signup endpoint in server.js
app.post('/signup', (req, res) => {
    const { name, email, password, birthday } = req.body;
  
    db.run(
      'INSERT INTO users (name, email, password, age) VALUES (?, ?, ?, ?)',
      [name, email, password, birthday],
      (err) => {
        if (err) {
          // Handle error
          res.status(500).send('Error inserting data into the database');
          return console.error(err.message);
        }
        // Log the successful insertion
        console.log('Data inserted into the database:', { name, email, password, birthday });
        res.status(200).send('User data inserted into the database');
      }
    );
  });
  

app.post('/login', (req, res) => {
  // Implement login logic, querying the SQLite database
});

// Other routes and middleware configurations

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
