const express = require("express");
const router = express.Router();

const {
  getExpiredVehicleInsurance,
  getExpiredDriverLicenses,
} = require("../controllers/expiredController");

router.get("/expired-vehicles-insurance", getExpiredVehicleInsurance);
router.get("/expired-driver-licenses", getExpiredDriverLicenses);

module.exports = router;
