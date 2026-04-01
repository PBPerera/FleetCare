import { createNotification } from "./notificationStaffController.js";
import TripRequest from "../models/TripRequest.js";

export const approveRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    // 1️⃣ Find request
    const request = await TripRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // 2️⃣ Approve request
    request.status = "approved";
    await request.save();

    // 3️⃣ CREATE NOTIFICATION FOR STAFF
    await createNotification({
      userId: request.staffId,   // staff who created the request
      role: "staff",
      type: "approved",
      title: "Request Approved",
      message: `Your trip request for Trip ID ${request.tripId} has been approved.`,
      schedule: request.schedule,
    });

    res.status(200).json({ message: "Request approved successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const { requestId, reason } = req.body;

    const request = await TripRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "rejected";
    await request.save();

    // 🔔 CREATE REJECTION NOTIFICATION
    await createNotification({
      userId: request.staffId,
      role: "staff",
      type: "rejected",
      title: "Request Rejected",
      from: request.destination,
      reason: reason || "Vehicle unavailable",
    });

    res.status(200).json({ message: "Request rejected successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
