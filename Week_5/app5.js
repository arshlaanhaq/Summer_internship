// Set up the application
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const entryRoute = require('./routes/entryroute');

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api/entries', entryRoute);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});