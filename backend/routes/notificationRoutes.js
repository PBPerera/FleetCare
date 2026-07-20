// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/notificationController');
// const auth = require('../middleware/auth'); // optional: your jwt middleware


// // Public read allowed for this example. Add `auth` to protect.
// router.get('/', auth.optional, controller.getAll);
// router.get('/:id', auth.optional, controller.getById);
// router.post('/', auth.required, controller.create);
// router.put('/:id', auth.required, controller.update);
// router.delete('/:id', auth.required, controller.remove);


// module.exports = router;

import express from "express";
const router = express.Router();
import notificationController from "../controllers/notificationController.js";

router.get("/", notificationController.getAllNotifications);




/**
 * POST /api/notifications/send
 * Body: { number, message }
 */
router.post("/send", (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({
      status: "error",
      message: "Phone number and message are required",
    });
  }

  // Clean phone number (remove spaces, +)
  const cleanedNumber = number.replace(/\D/g, "");

  // Create WhatsApp chat link
  const whatsappUrl = `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(
    message
  )}`;

  return res.json({
    status: "success",
    whatsappUrl,
  });
});

export default router;
