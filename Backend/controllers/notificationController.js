// controllers/notificationController.js
import Notification from "../models/Notification.js";
import io from "../server.js"; // ensure server.js exports the socket instance (io)

export const createNotification = async (userId, message, type) => {
  try {
    const notification = await Notification.create({ user: userId, message, type });
    if (io) io.to(userId.toString()).emit("notification", notification);
    return notification;
  } catch (error) {
    console.error("Notification error:", error.message);
  }
};

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    notification.read = true;
    await notification.save();
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
