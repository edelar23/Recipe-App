const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
   res.send('Hello from the backend!');
});

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is connected!' });
});