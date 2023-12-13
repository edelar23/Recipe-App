const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');
const fs = require('fs');
const aws = require('aws-sdk');
const multer = require('multer');

const upload = multer();

// ES6+ example
//import { S3Client} from "@aws-sdk/client-s3";

//import dotenv from 'dotenv'

//dotenv.config()

aws.config.update({
  accessKeyId: 'AKIA2IS4W5Z5RSFM2OO5',
  secretAccessKey: 'E0kLTwjotykDawiZhhvZ/clPG/bzPvX7a/bBVk/I',
  region: 'us-east-2',
});

const s3 = new aws.S3();

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
  const { recipeName, tags, ingredients, prepTime, cookTime, steps, calories, protein, carbs, caption } = req.body;
  const imageFile = req.files && req.files.imageFile;

  if (imageFile) {
    const params = {
      Bucket: 'usersandposts',
      Key: `uploads/${Date.now()}_${imageFile.name}`,
      Body: imageFile.data,
      ContentType: imageFile.mimetype,
    };

    // Upload the image to S3
    s3.upload(params, async (err, data) => {
      if (err) {
        console.error('Error uploading file to S3:', err);
        return res.status(500).send('Error uploading file to S3');
      }

      // Insert the post into the database with the S3 URL
      db.run(
        'INSERT INTO posts (user_id, recipeName, tags, imageFile, ingredients, prepTime, cookTime, steps, calories, protein, carbs, caption) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [req.body.userId, recipeName, tags, data.Location, ingredients, prepTime, cookTime, steps, calories, protein, carbs, caption],
        (dbErr) => {
          if (dbErr) {
            console.error('Error inserting data into the database:', dbErr.message);
            return res.status(500).send('Error inserting data into the database');
          }

          console.log('Post created in the database:', {
            recipeName,
            tags,
            imageFile: data.Location, // Use S3 URL
            ingredients,
            prepTime,
            cookTime,
            steps,
            calories,
            protein,
            carbs,
            caption
          });
          res.status(200).send('Post created successfully');
        }
      );
    });
  } else {
    // If no image is uploaded, insert the post without an image
    db.run(
      'INSERT INTO posts (user_id, recipeName, tags, ingredients, prepTime, cookTime, steps, calories, protein, carbs, caption) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [req.body.userId, recipeName, tags, ingredients, prepTime, cookTime, steps, calories, protein, carbs, caption],
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
          caption
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



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
