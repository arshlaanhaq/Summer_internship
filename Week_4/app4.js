const express = require('express');
const app = express();

app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Route to respond to GET requests at '/'
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// Endpoint 1: /users
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'Arshlaan' },
    { id: 2, name: 'Shan' },
  ];
  res.json(users);
});


app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send('Name is required');
  } else {
    res.send(`User created: ${name}`);
  }
});

// Endpoint 2: /comments
app.get('/comments', (req, res) => {
    const comments = [
      { id: 1, comments: 'Nice work' },
      { id: 2, comments: 'Task completed' },
    ];
    res.json(comments);
  });
  
  app.post('/comments', (req, res) => {
    const { comments } = req.body;
    if (!comments) {
      res.status(400).send('comments is required');
    } else {
      res.send(`Comment created: ${comments}`);
    }
  });
  
// Route to respond to all other requests with a 404 error
app.use((req, res) => {
  res.status(404).send('Not found');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});