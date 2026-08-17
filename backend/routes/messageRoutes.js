const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// POST /api/messages -> حفظ رسالة جديدة (لما حد يبعت من الـ Contact form)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "كل الحقول مطلوبة" });
    }

    const newMessage = await Message.create({ name, email, message });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/messages -> عرض كل الرسايل (تستخدمها انت بس عشان تشوفهم)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
