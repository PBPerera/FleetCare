import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServiceStats
} from '../controllers/serviceController.js';

const router = express.Router();

router.get('/stats', getServiceStats);

router.route('/')
  .get(getAllServices)
  .post(createService);

router.route('/:id')
  .get(getServiceById)
  .put(updateService)
  .delete(deleteService);

export default router;