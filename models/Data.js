const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  title: String,
  description: String,
  executionTime: Number,
});

module.exports = mongoose.model('Data', dataSchema);