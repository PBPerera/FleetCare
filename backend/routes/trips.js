import express from "express";
import {
  createTripFromApproval,
  getAllTrips,
  getTripByRequestId,
  getApprovedTrips,
  getRejectedTrips,
  deleteTrip,
} from "../controllers/tripController.js";
import { required as auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// non-controller endpoints (if needed) now unified with controller logic
router.get("/", auth, getAllTrips);
router.get("/approved", auth, getApprovedTrips);
router.get("/rejected", auth, getRejectedTrips);
router.get("/request/:requestId", auth, getTripByRequestId);
router.post("/", auth, createTripFromApproval);
router.delete("/:id", auth, deleteTrip);

export default router;
