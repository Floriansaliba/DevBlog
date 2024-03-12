const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageName: { type: String, required: true },
  date: { type: Date, required: true },
  content: [{ type: Object }],
  views: { type: Number, required: true, defaultValue: 0 },
  likes: { type: Number, required: true, defaultValue: 0 },
});

module.exports = mongoose.model('Articles', articleSchema);
