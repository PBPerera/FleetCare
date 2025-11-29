const express = require('express');
const router = express.Router();
const {
  getAllRepairs,
  getRepairById,
  createRepair,
  updateRepair,
  deleteRepair,
  approveRepair,
  rejectRepair,
  getPendingRepairs,
  getRepairStats,
  updateApprovalStage
} = require('../controllers/repairController');

router.get('/stats', getRepairStats);
router.get('/pending', getPendingRepairs);

router.put('/:id/approve', approveRepair);
router.put('/:id/reject', rejectRepair);
router.put('/:id/approval-stage', updateApprovalStage);

router.route('/')
  .get(getAllRepairs)
  .post(createRepair);

router.route('/:id')
  .get(getRepairById)
  .put(updateRepair)
  .delete(deleteRepair);

module.exports = router; 