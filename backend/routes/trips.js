import express from "express";
import { getTrips, createTrip, updateTrip } from "../controllers/tripController.js";

const router = express.Router();

router.get("/", getTrips);
router.post("/", createTrip);
router.put("/:id", updateTrip);

export default router;