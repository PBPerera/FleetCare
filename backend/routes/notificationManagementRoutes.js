const express = require("express");
const router = express.Router();

const {
  getTripSchedule,
  getMaintenanceAlerts,
  getExpiredInsurance,
  getExpiredLicenses,
} = require("../controllers/notificationManagementController");

// Trip Schedule
router.get("/trips", getTripSchedule);

// Maintenance
router.get("/maintenance", getMaintenanceAlerts);

// Expired Insurance
router.get("/insurance/expired", getExpiredInsurance);

// Expired Driver License
router.get("/license/expired", getExpiredLicenses);

module.exports = router;
