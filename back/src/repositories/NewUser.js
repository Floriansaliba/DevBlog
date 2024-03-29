const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Array, required: true, default: [] },
  preferences: { type: Array, required: true, default: [] },
  likes: { type: Array, required: true, default: [] },
});

module.exports = mongoose.model('User', userSchema);
