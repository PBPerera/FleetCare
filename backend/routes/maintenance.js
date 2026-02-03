import express from 'express';
import {
  getDashboardStats,
  searchMaintenance,
  getMaintenanceHistory
} from '../controllers/maintenanceController.js';

const router = express.Router();

router.get('/dashboard/stats', getDashboardStats);
router.get('/search', searchMaintenance);
router.get('/history/:vehicleId', getMaintenanceHistory);

export default router;