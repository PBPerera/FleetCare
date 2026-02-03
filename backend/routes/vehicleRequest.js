import { Router } from "express";
import {
  createVehicleRequest,
  getAllVehicleRequests,
  getVehicleRequestByRequestId,
  updateVehicleRequestStatus,
  approveVehicleRequest,
  rejectVehicleRequest,
  updateVehicleRequest,
  deleteVehicleRequest,
  getVehicleRequestStats,
} from "../controllers/vehicleRequestController.js";

const router = Router();

router.get("/", getAllVehicleRequests);
router.get("/stats", getVehicleRequestStats);
router.get("/request/:requestId", getVehicleRequestByRequestId);
router.post("/", createVehicleRequest);
router.put("/:id", updateVehicleRequest);
router.patch("/:id/status", updateVehicleRequestStatus);
router.patch("/:id/approve", approveVehicleRequest);
router.patch("/:id/reject", rejectVehicleRequest);
router.delete("/:id", deleteVehicleRequest);

export default router;
