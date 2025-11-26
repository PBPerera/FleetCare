const express = require("express");
const router = express.Router();
const StaffNotification = require("../models/StaffNotification");

// Get all notifications
router.get("/", async (req, res) => {
    const data = await StaffNotification.find({ read: false });
    res.json(data);
});

// Mark as read
router.put("/:id/read", async (req, res) => {
    await StaffNotification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: "Marked as read" });
});

module.exports = router;
