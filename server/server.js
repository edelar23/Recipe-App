const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('users.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

app.post('/signup', async (req, res) => {
  const { name, email, password, birthday } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    db.run(
      'INSERT INTO users (name, email, password, age) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, birthday],
      (err) => {
        if (err) {
          res.status(500).send('Error inserting data into the database');
          return console.error(err.message);
        }
        console.log('Data inserted into the database:', { name, email, password, birthday });
        res.status(200).send('User data inserted into the database');
      }
    );
  } catch (error) {
    res.status(500).send('Error hashing the password');
    console.error('Error:', error);
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  db.get(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, row) => {
      if (err) {
        res.status(500).send('Error checking login credentials');
        return console.error(err.message);
      }

      if (row) {
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, row.password);

        if (passwordMatch) {
          console.log('User logged in:', row);
          res.status(200).send('User logged in successfully');
        } else {
          console.log('Invalid email or password');
          res.status(401).send('Invalid email or password');
        }
      } else {
        console.log('Invalid email or password');
        res.status(401).send('Invalid email or password');
      }
    }
  );
});


app.post('/create', (req, res) => {
  const { recipeName, tags, imageFile, ingredients, prepTime, cookTime, steps } = req.body;

  // Extract user information from the request (you need to implement user authentication)
  const userId = req.user ? req.user.id : null;

  if (!userId) {
    // If user is not authenticated, return an error
    return res.status(401).send('User not authenticated');
  }

  // Insert the post into the database, associating it with the user
  db.run(
    'INSERT INTO posts (user_id, recipeName, tags, imageFile, ingredients, prepTime, cookTime, steps) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [userId, recipeName, tags, imageFile, ingredients, prepTime, cookTime, steps],
    (err) => {
      if (err) {
        res.status(500).send('Error inserting data into the database');
        return console.error(err.message);
      }
      console.log('Post created in the database:', { recipeName, tags, imageFile, ingredients, prepTime, cookTime, steps });
      res.status(200).send('Post created successfully');
    }
  );
});


// ... (other routes and middleware configurations remain the same)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
