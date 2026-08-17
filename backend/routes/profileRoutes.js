const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// GET /api/profile -> بيانات البروفايل
router.get("/", async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/profile -> تعديل البروفايل
router.put("/", async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = Date.now();
    let profile = await Profile.findOneAndUpdate({}, updates, { new: true, upsert: true });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;