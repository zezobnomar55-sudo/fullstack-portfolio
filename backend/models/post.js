const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  excerpt: {
    type: String,
    required: [true, "Excerpt is required"],
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "Full-Stack",
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  githubUrl: {
    type: String,
    default: "",
  },
  liveUrl: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  readTime: {
    type: String,
    default: "3 min",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);