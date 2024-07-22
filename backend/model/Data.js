// models/Data.js

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  country: String,
  topic: String,
  region: String,
  city: String,
  end_year : Date,
  sector : String,
  start_year : Date,
  published : Date
});

module.exports = mongoose.model('test_data', dataSchema);
