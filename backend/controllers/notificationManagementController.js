import Trip from "../models/Trip.js";
import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";
import Notification from "../models/Notification.js";

// ================= TRIP SCHEDULE =================
export const getTripSchedule = async (req, res) => {
  const trips = await Trip.find();
  res.json(trips);
};

// ================= MAINTENANCE =================
export const getMaintenanceAlerts = async (req, res) => {
  const maintenance = await Notification.find({ type: "maintenance" });
  res.json(maintenance);
};

// ================= EXPIRED INSURANCE =================
export const getExpiredInsurance = async (req, res) => {
  const today = new Date();

  const expired = await Vehicle.find({
    insuranceExpiryDate: { $lt: today },
  });

  res.json(expired);
};

// ================= EXPIRED DRIVER LICENSE =================
export const getExpiredLicenses = async (req, res) => {
  const today = new Date();

  const expired = await Driver.find({
    licenseExpiryDate: { $lt: today },
  });

  res.json(expired);
};
