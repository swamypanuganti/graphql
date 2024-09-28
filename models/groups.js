const mongoose = require('mongoose');

const groupsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number_of_users: { type: Number, default: 1 },
  group_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('groups', groupsSchema);
