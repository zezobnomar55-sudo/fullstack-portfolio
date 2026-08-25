require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Import Route Modules (5 Core Modules + Auth)
const messageRoutes = require("./routes/messageRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");
const skillRoutes = require("./routes/skillRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Core Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Endpoints for the 5 Modules + Auth
app.use("/api/messages", messageRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/auth", authRoutes);

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Full-Stack Portfolio API Server is running",
    modules: [
      "/api/messages",
      "/api/posts",
      "/api/profile",
      "/api/skills",
      "/api/experiences",
      "/api/auth"
    ]
  });
});

// Central Error Handling Middleware
app.use(errorHandler);

// Database Connection & Server Listener
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio_db";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
  });