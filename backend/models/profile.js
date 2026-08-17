const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: { type: String, default: "زياد عمر" },
  role: { type: String, default: "Full-Stack Developer" },
  bio: { type: String, default: "" },
  email: { type: String, default: "zezobnomar55@gmail.com" },
  github: { type: String, default: "https://github.com/zezobnomar55-sudo" },
  linkedin: { type: String, default: "https://www.linkedin.com/in/ziad-omar-880571247" },
  avatar: { type: String, default: "" },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Profile", profileSchema);