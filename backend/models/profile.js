const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Ziad Omar",
  },
  role: {
    type: String,
    default: "Full-Stack Engineer & Software Architect",
  },
  bio: {
    type: String,
    default: "Full-Stack Web Developer specializing in Angular, React, Node.js, Express, and MongoDB.",
  },
  email: {
    type: String,
    default: "zezobnomar55@gmail.com",
  },
  github: {
    type: String,
    default: "https://github.com/zezobnomar55-sudo",
  },
  linkedin: {
    type: String,
    default: "https://www.linkedin.com/in/ziad-omar-880571247",
  },
  location: {
    type: String,
    default: "Cairo, Egypt",
  },
  avatar: {
    type: String,
    default: "assets/ziad_profile.jpg",
  },
  cvUrl: {
    type: String,
    default: "#",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Profile", profileSchema);