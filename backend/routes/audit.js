// routes/audit.js
const express = require('express');
const router = express.Router();
const {
  getAuditLogs,
  getCompletedServices,
  getCompletedRepairs,
  getAuditStats
} = require('../controllers/auditController');

// Get all audit logs (completed services + repairs)
router.get('/logs', getAuditLogs);

// Get completed services only
router.get('/services', getCompletedServices);

// Get completed repairs only
router.get('/repairs', getCompletedRepairs);

// Get audit statistics
router.get('/stats', getAuditStats);

module.exports = router;