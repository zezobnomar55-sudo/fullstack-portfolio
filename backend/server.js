require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const messageRoutes = require("./routes/messageRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/messages", messageRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);

// Root Route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Portfolio Backend is running 🚀" });
});

// Database Connection & Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ اتصل بـ MongoDB بنجاح");
    app.listen(PORT, () => {
      console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ فشل الاتصال بـ MongoDB:", err.message);
  });