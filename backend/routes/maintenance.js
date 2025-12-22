const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  searchMaintenance,
  getMaintenanceHistory
} = require('../controllers/maintenanceController');

router.get('/dashboard/stats', getDashboardStats);
router.get('/search', searchMaintenance);
router.get('/history/:vehicleId', getMaintenanceHistory);

module.exports = router;