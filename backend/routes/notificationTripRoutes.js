import express from "express";
const router = express.Router();
import Trip from "../models/Trip.js";  // <-- use existing model

// GET all trips for Notification Management
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
