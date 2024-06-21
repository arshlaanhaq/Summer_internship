// Define the entry controller
const Entry = require('../model/entry');

// Create a new entry
exports.createEntry = async (req, res) => {
  try {
    const entry = new Entry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ message: 'Error creating entry' });
  }
};

// Read all entries
exports.getEntries = async (req, res) => {
  try {
    const entries = await Entry.find().exec();
    res.json(entries);
  } catch (err) {
    res.status(404).json({ message: 'No entries found' });
  }
};

// Read a single entry
exports.getEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id).exec();
    if (!entry) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      res.json(entry);
    }
  } catch (err) {
    res.status(404).json({ message: 'Entry not found' });
  }
};

// Update an entry
exports.updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
    if (!entry) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      res.json(entry);
    }
  } catch (err) {
    res.status(400).json({ message: 'Error updating entry' });
  }
};

// Delete an entry
exports.deleteEntry = async (req, res) => {
  try {
    await Entry.findByIdAndRemove(req.params.id).exec();
    res.status(204).json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Entry not found' });
  }
};