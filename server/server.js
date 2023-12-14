const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');
const fs = require('fs');
const aws = require('aws-sdk');
const multer = require('multer');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { v4: uuidv4 } = require('uuid');

const upload = multer();



app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('users.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

const firebaseConfig = {
  apiKey: "AIzaSyBLrDQHBEtImDScaEUxCukYGg4ipzXhkDY",
  authDomain: "recipe-app-86e28.firebaseapp.com",
  projectId: "recipe-app-86e28",
  storageBucket: "recipe-app-86e28.appspot.com",
  messagingSenderId: "552327482514",
  appId: "1:552327482514:web:3b90a235af6a22ed756a4b",
  measurementId: "G-WFCKPWH3CV"
};

const appFirebase = initializeApp(firebaseConfig);
const storage = getStorage(appFirebase);


app.post('/signup', async (req, res) => {
  const { name, email, password, birthday } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

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
        const passwordMatch = await bcrypt.compare(password, row.password);

        if (passwordMatch) {
          console.log('User logged in:', row);

          res.status(200).json({
            id: row.id,
            name: row.name,
            email: row.email,
          });
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


app.post('/create', upload.any(), async (req, res) => {
  console.log(req.files);
  const { recipeName, tags, imageFile, ingredients, prepTime, cookTime, steps, calories, protein, carbs, caption } = req.body;

  if (imageFile) {
    const fileName = imageFile.split('/').pop().split('?')[0];
    const imageRef = ref(storage, `uploads/${fileName}`);
    
    try {
      await uploadBytes(imageRef, imageFile.buffer);

      const imageUrl = await getDownloadURL(imageRef, { contentDisposition: 'inline' });
      
      // Insert the post into the database with the Firebase Storage URL
      
      db.run(
        'INSERT INTO posts (user_id, recipeName, tags, imageFile, ingredients, prepTime, cookTime, steps, calories, protein, carbs, caption) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [req.body.user_id, recipeName, tags, imageUrl, ingredients, prepTime, cookTime, steps, calories, protein, carbs, caption],
        (dbErr) => {
          if (dbErr) {
            console.error('Error inserting data into the database:', dbErr.message);
            return res.status(500).send('Error inserting data into the database');
          }

          console.log('Post created in the database:', {
            recipeName,
            tags,
            imageFile: imageUrl, // Use Firebase Storage URL
            ingredients,
            prepTime,
            cookTime,
            steps,
            calories,
            protein,
            carbs,
            caption,
          });
          res.status(200).send('Post created successfully');
        }
      );
    } catch (err) {
      console.error('Error uploading file to Firebase Storage:', err);
      return res.status(500).send('Error uploading file to Firebase Storage');
    }
  } else {
    // If no image is uploaded, insert the post without an image
    db.run(
      'INSERT INTO posts (user_id, recipeName, tags, ingredients, prepTime, cookTime, steps, calories, protein, carbs, caption) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [req.body.user_id, recipeName, tags, ingredients, prepTime, cookTime, steps, calories, protein, carbs, caption],
      (dbErr) => {
        if (dbErr) {
          console.error('Error inserting data into the database:', dbErr.message);
          return res.status(500).send('Error inserting data into the database');
        }

        console.log('Post created in the database:', {
          recipeName,
          tags,
          ingredients,
          prepTime,
          cookTime,
          steps,
          calories,
          protein,
          carbs,
          caption,
        });
        res.status(200).send('Post created successfully');
      }
    );
  }
});

// Still need to update the route to include the user ID in the URL
app.get('/getDailyMacros/:userId', (req, res) => {
  const userId = req.params.userId;

  db.get('SELECT * FROM macros WHERE user_id = ?', [userId], (err, row) => {
    if (err) {
      res.status(500).send('Error fetching daily macros from the database');
      return console.error(err.message);
    }

    if (row) {
      const { protein, carbs, fats } = row;
      res.status(200).json({ protein, carbs, fats });
    } else {
      res.status(404).send('Daily macros not found for the user');
    }
  });
});

//Daily Macros Goal
app.post('/updateDailyMacros', (req, res) => {
  const { protein, carbs, fats } = req.body;
  const userId = 1; // replace with the actual user id

  const sql = 'UPDATE macros SET protein = ?, carbs = ?, fats = ? WHERE user_id = ?';

  db.run(sql, [protein, carbs, fats, userId], (err) => {
    if (err) {
      console.error('Error updating daily macros in the database:', err.message);
      res.status(500).send('Error updating daily macros in the database');
      return;
    }

    console.log('Daily macros updated in the database:', { protein, carbs, fats });
    res.status(200).send('Daily macros updated successfully');
  });
});

app.get('/getPosts', (req, res) => {
  db.all('SELECT * FROM posts', (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get ('/getPosts/:userId', (req, res) => {
  const userId = req.params.userId;

  db.all('SELECT * FROM posts WHERE user_id = ?', [userId], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
