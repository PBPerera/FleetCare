import express from "express";
const router = express.Router();

import {
  getTripSchedule,
  getMaintenanceAlerts,
  getExpiredInsurance,
  getExpiredLicenses,
} from "../controllers/notificationManagementController.js";

// Trip Schedule
router.get("/trips", getTripSchedule);

// Maintenance
router.get("/maintenance", getMaintenanceAlerts);

// Expired Insurance
router.get("/insurance/expired", getExpiredInsurance);

// Expired Driver License
router.get("/license/expired", getExpiredLicenses);

module.exports = router;
