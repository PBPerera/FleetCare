import express from 'express';
const router = express.Router();

import {
  getExpiredVehicleInsurance,
  getExpiredDriverLicenses,
} from "../controllers/expiredController.js";

router.get("/expired-vehicles-insurance", getExpiredVehicleInsurance);
router.get("/expired-driver-licenses", getExpiredDriverLicenses);

export default router;
