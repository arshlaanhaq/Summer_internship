const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;