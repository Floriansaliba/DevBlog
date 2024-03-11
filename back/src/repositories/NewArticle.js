const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageName: { type: String, required: true },
  date: { type: Date, required: true },
  content: [{ type: Object }],
});

module.exports = mongoose.model('Articles', articleSchema);
