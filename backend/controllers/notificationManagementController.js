const Trip = require("../models/Trip");
const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");
const Notification = require("../models/Notification");

// ================= TRIP SCHEDULE =================
exports.getTripSchedule = async (req, res) => {
  const trips = await Trip.find();
  res.json(trips);
};

// ================= MAINTENANCE =================
exports.getMaintenanceAlerts = async (req, res) => {
  const maintenance = await Notification.find({ type: "maintenance" });
  res.json(maintenance);
};

// ================= EXPIRED INSURANCE =================
exports.getExpiredInsurance = async (req, res) => {
  const today = new Date();

  const expired = await Vehicle.find({
    insuranceExpiryDate: { $lt: today },
  });

  res.json(expired);
};

// ================= EXPIRED DRIVER LICENSE =================
exports.getExpiredLicenses = async (req, res) => {
  const today = new Date();

  const expired = await Driver.find({
    licenseExpiryDate: { $lt: today },
  });

  res.json(expired);
};
