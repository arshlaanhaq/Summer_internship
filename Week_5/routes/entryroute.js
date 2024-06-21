// Define the entry route
const express = require('express');
const router = express.Router();
const entryController = require('../controller/entrycontroller');

router.post('/', entryController.createEntry);
router.get('/', entryController.getEntries);
router.get('/:id', entryController.getEntry);
router.put('/:id', entryController.updateEntry);
router.delete('/:id', entryController.deleteEntry);

module.exports = router;