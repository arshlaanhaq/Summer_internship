const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./users');

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).exec();
      if (!user) {
        res.status(404).send({ message: 'User not found' });
        return;
      }
      await User.findByIdAndDelete(userId).exec();
      res.status(204).send({ message: 'User deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});