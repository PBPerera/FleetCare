import express from "express";
const router = express.Router();

import {
  getStaffNotifications,
  markAsRead,
} from "../controllers/notificationStaffController.js";

router.get("/staff/:userId", getStaffNotifications);
router.put("/read/:id", markAsRead);

export default router;
