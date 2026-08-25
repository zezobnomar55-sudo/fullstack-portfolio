const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Skill name is required"],
    trim: true,
  },
  category: {
    type: String,
    enum: ["Frontend", "Backend", "Database", "Tools & DevOps"],
    default: "Frontend",
  },
  level: {
    type: Number,
    min: 1,
    max: 100,
    default: 85,
  },
  icon: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Skill", skillSchema);
