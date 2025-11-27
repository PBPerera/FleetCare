const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServiceStats
} = require('../controllers/serviceController');

// Get service statistics
router.get('/stats', getServiceStats);

// CRUD operations
router.route('/')
  .get(getAllServices)
  .post(createService);

router.route('/:id')
  .get(getServiceById)
  .put(updateService)
  .delete(deleteService);

module.exports = router; 