import express from 'express';
import {
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
} from '../controllers/repairController.js';

const router = express.Router();

// GET /api/repairs/stats - Get repair statistics
router.get('/stats', getRepairStats);

// GET /api/repairs/pending - Get pending repairs
router.get('/pending', getPendingRepairs);

// PUT /api/repairs/:id/approve - Approve repair
router.put('/:id/approve', approveRepair);

// PUT /api/repairs/:id/reject - Reject repair
router.put('/:id/reject', rejectRepair);

// PUT /api/repairs/:id/approval-stage - Update approval stage
router.put('/:id/approval-stage', updateApprovalStage);

// GET /api/repairs - Get all repairs
// POST /api/repairs - Create new repair
router.route('/')
  .get(getAllRepairs)
  .post(createRepair);

// GET /api/repairs/:id - Get single repair
// PUT /api/repairs/:id - Update repair
// DELETE /api/repairs/:id - Delete repair
router.route('/:id')
  .get(getRepairById)
  .put(updateRepair)
  .delete(deleteRepair);

export default router;