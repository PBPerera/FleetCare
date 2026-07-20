import VehicleInsurance from "../models/VehicleInsurance.js";
import DriverLicense from "../models/DriverLicense.js";

// ============================================
// GET EXPIRED VEHICLE INSURANCE
// ============================================
export const getExpiredVehicleInsurance = async (req, res) => {
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
export const getExpiredDriverLicenses = async (req, res) => {
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


