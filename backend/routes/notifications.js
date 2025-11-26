const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// Get all notifications
router.get("/", async (req, res) => {
  try {
    const list = await Notification.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add notification
router.post("/", async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.json({ message: "Notification saved", notification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
