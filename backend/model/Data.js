// models/Data.js

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  country: String,
  topics: String,
  region: String,
  city: String,
  end_year : Date,
  start_year : Date
});

module.exports = mongoose.model('test_data', dataSchema);
