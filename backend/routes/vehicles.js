const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");

// 👉 GET all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch vehicles" });
  }
});

// 👉 ADD new vehicle
router.post("/", async (req, res) => {
  try {
    const v = new Vehicle(req.body);
    await v.save();
    res.json({ message: "Vehicle added", vehicle: v });
  } catch (err) {
    res.status(500).json({ error: "Cannot add vehicle" });
  }
});

// 👉 UPDATE vehicle
router.put("/:id", async (req, res) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Cannot update vehicle" });
  }
});

// 👉 DELETE vehicle
router.delete("/:id", async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    res.status(500).json({ error: "Cannot delete vehicle" });
  }
});

module.exports = router;
