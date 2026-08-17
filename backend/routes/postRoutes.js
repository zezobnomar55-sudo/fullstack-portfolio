const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET /api/posts -> كل المقالات
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts -> إضافة مقال (Admin)
router.post("/", async (req, res) => {
  try {
    const { title, excerpt, tags, readTime } = req.body;
    if (!title || !excerpt) {
      return res.status(400).json({ error: "العنوان والملخص مطلوبين" });
    }
    const newPost = await Post.create({ title, excerpt, tags: tags || [], readTime: readTime || "3 min" });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/posts/:id -> حذف مقال (Admin)
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "تم الحذف" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;