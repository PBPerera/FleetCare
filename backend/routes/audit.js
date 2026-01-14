import express from 'express';
const router = express.Router();
import {
  getAuditLogs,
  getCompletedServices,
  getCompletedRepairs
} from '../controllers/auditController.js';

// Get all audit logs (completed services + repairs)
router.get('/logs', getAuditLogs);

// Get completed services only
router.get('/services', getCompletedServices);

// Get completed repairs only
router.get('/repairs', getCompletedRepairs);

export default router;