const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dataRoutes = require('./routes/data');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Use cors middleware
app.use('/api/data', dataRoutes);

// Route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

mongoose.connect('mongodb://localhost:27017/mongo_database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
