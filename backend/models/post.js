const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  excerpt: { type: String, required: true, trim: true },
  tags: [{ type: String, trim: true }],
  readTime: { type: String, default: "3 min" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);