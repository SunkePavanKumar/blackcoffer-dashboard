// routes/dataRoutes.js

const express = require('express');
const router = express.Router();
const dataSchema = require('../model/Data');

// Fetch all data
router.get('/', async (req, res) => {
  try {
    const data = await dataSchema.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
