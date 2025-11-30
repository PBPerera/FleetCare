const Trip = require("../models/Trip");
const Maintenance = require("../models/Maintenance");
const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");

exports.getNotifications = async (req, res) => {
  try {
    const today = new Date();

    // 1. Trip Schedule (Upcoming trips only)
    const trips = await Trip.find();

    // 2. Maintenance Alerts
    const maintenance = await Maintenance.find();

    // 3. Expired Insurance
    const expiredInsurance = await Vehicle.find({
      insuranceExpiry: { $lt: today }
    });

    // 4. Expired Driver Licenses
    const expiredLicenses = await Driver.find({
      licenseExpiry: { $lt: today }
    });

    res.json({
      trips,
      maintenance,
      expiredInsurance,
      expiredLicenses
    });

  } catch (err) {
    console.error("Notification error:", err);
    res.status(500).json({ message: "Server error fetching notifications" });
  }
};
