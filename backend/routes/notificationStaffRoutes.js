const express = require("express");
const router = express.Router();

const {
  getStaffNotifications,
  markAsRead,
} = require("../controllers/notificationStaffController");

router.get("/staff/:userId", getStaffNotifications);
router.put("/read/:id", markAsRead);

module.exports = router;
