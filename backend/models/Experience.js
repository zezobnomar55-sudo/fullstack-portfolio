const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Role title is required"],
    trim: true,
  },
  company: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  period: {
    type: String,
    required: [true, "Period/Duration is required"],
    trim: true,
  },
  location: {
    type: String,
    default: "Cairo, Egypt",
  },
  description: {
    type: String,
    default: "",
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Experience", experienceSchema);
