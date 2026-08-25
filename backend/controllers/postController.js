const Post = require("../models/Post");

// @desc    Get all projects/posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create a new post/project
// @route   POST /api/posts
// @access  Admin
const createPost = async (req, res) => {
  try {
    const { title, excerpt, description, category, tags, githubUrl, liveUrl, imageUrl, readTime, featured } = req.body;

    if (!title || !excerpt) {
      return res.status(400).json({ error: "Title and excerpt are required" });
    }

    const post = await Post.create({
      title,
      excerpt,
      description,
      category,
      tags,
      githubUrl,
      liveUrl,
      imageUrl,
      readTime,
      featured,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update post/project
// @route   PUT /api/posts/:id
// @access  Admin
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete post/project
// @route   DELETE /api/posts/:id
// @access  Admin
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
