const express = require("express");
const router = express.Router();
const {
  getMessages,
  createMessage,
  markMessageRead,
  deleteMessage,
} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .get(getMessages)
  .post(createMessage);

router.put("/:id/read", protect, markMessageRead);
router.delete("/:id", protect, deleteMessage);

module.exports = router;
