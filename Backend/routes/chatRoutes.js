// routes/chatRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import ChatMessage from "../models/ChatMessage.js";

const router = express.Router();

// Fetch messages for a ticket
router.get("/ticket/:ticketId", protect, async (req, res) => {
  try {
    const messages = await ChatMessage.find({ ticketId: req.params.ticketId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
});

// Post a message (also used by socket server if needed)
router.post("/", protect, async (req, res) => {
  try {
    const msg = new ChatMessage({
      ticketId: req.body.ticketId,
      sender: req.user._id,
      receiver: req.body.receiver || null,
      text: req.body.text || "",
      fileUrl: req.body.fileUrl || null
    });
    const saved = await msg.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
});

export default router;
