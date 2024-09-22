const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  mobile_number: String,
  full_name: String,
  age: Number
}, { timestamps: true });

module.exports = mongoose.model('users', usersSchema);
