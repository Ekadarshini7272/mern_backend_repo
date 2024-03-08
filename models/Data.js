const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 4,
    maxlength: 8,
    required: true
  },
  description: {
    type: String,
    maxlength: 70,
    required: true
  }
});

module.exports = mongoose.model('Data', dataSchema);