import { Router } from "express";
import {
  createTripFromApproval,
  getAllTrips,
  getTripByRequestId,
  getApprovedTrips,
  getRejectedTrips,
  deleteTrip,
} from "../controllers/tripController.js";

const router = Router();

router.get("/", getAllTrips);
router.get("/approved", getApprovedTrips);
router.get("/rejected", getRejectedTrips);
router.get("/request/:requestId", getTripByRequestId);
router.post("/", createTripFromApproval);
router.delete("/:id", deleteTrip);

export default router;