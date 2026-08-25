const Experience = require("../models/Experience");

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create experience
// @route   POST /api/experiences
// @access  Admin
const createExperience = async (req, res) => {
  try {
    const { title, company, period, location, description, technologies } = req.body;
    if (!title || !company || !period) {
      return res.status(400).json({ error: "Title, company, and period are required" });
    }

    const exp = await Experience.create({ title, company, period, location, description, technologies });
    res.status(201).json(exp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update experience
// @route   PUT /api/experiences/:id
// @access  Admin
const updateExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exp) return res.status(404).json({ error: "Experience not found" });
    res.json(exp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete experience
// @route   DELETE /api/experiences/:id
// @access  Admin
const deleteExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) return res.status(404).json({ error: "Experience not found" });
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};
