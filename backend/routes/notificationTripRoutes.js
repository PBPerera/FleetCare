const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");  // <-- use existing model

// GET all trips for Notification Management
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
