const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
   res.send('Hello from the backend!');
});

const dbURI = process.env.DB_URL || 'mongodb+srv://Recipe:52EjNbTwydEQsFyK@recipe.ualxu5g.mongodb.net/?retryWrites=true&w=majority'
const dbOptions = {useNewUrlParser:true, useUnifiedTopology:true}
mongoose.connect(dbURI, dbOptions)
.then(() => console.log('DB Connected!'))
.catch(err => console.log(err))

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is connected!' });
});