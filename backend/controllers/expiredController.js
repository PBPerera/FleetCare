const VehicleInsurance = require("../models/VehicleInsurance");
const DriverLicense = require("../models/DriverLicense");

// ============================================
// GET EXPIRED VEHICLE INSURANCE
// ============================================
exports.getExpiredVehicleInsurance = async (req, res) => {
  try {
    const today = new Date();

    const expiredVehicles = await VehicleInsurance.find({
      insuranceExpiryDate: { $lt: today },
    });

    res.status(200).json(expiredVehicles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ============================================
// GET EXPIRED DRIVER LICENSES
// ============================================
exports.getExpiredDriverLicenses = async (req, res) => {
  try {
    const today = new Date();

    const expiredDrivers = await DriverLicense.find({
      licenseExpiryDate: { $lt: today },
    });

    res.status(200).json(expiredDrivers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

controllers/expiredController.js


