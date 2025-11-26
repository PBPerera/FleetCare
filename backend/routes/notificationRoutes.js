const express = require("express");
const router = express.Router();

const Trip = require("../models/TripSchedule");
const Maintenance = require("../models/Maintenance");
const Insurance = require("../models/Insurance");
const License = require("../models/License");

// GET all notification tables
router.get("/trip-schedule", async (req, res) => {
    res.json(await Trip.find());
});

router.get("/maintenance", async (req, res) => {
    res.json(await Maintenance.find());
});

router.get("/insurance-expired", async (req, res) => {
    res.json(await Insurance.find());
});

router.get("/license-expired", async (req, res) => {
    res.json(await License.find());
});

module.exports = router;
