const Skill = require("../models/Skill");

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create skill
// @route   POST /api/skills
// @access  Admin
const createSkill = async (req, res) => {
  try {
    const { name, category, level, icon } = req.body;
    if (!name) return res.status(400).json({ error: "Skill name is required" });

    const skill = await Skill.create({ name, category, level, icon });
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Admin
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Admin
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
