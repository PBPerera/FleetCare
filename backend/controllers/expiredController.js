import VehicleInsurance from "../models/VehicleInsurance.js";
import DriverLicense from "../models/DriverLicense.js";

// ============================================
// GET EXPIRED VEHICLE INSURANCE
// ============================================
export const getExpiredVehicleInsurance = async (req, res) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const maxExpiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999);

    const allVehicles = await VehicleInsurance.find().sort({ insuranceExpiryDate: 1 });
    const expiredVehicles = allVehicles.filter((vehicle) => {
      const expiry = vehicle.insuranceExpiryDate || vehicle.insurance_expiry;
      if (!expiry) return false;
      const expDate = new Date(expiry);
      if (isNaN(expDate.getTime())) return false;
      return expDate >= todayStart && expDate <= maxExpiryDate;
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
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const maxExpiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999);

    const allDrivers = await DriverLicense.find().sort({ licenseExpiryDate: 1 });
    const expiredDrivers = allDrivers.filter((driver) => {
      if (!driver.licenseExpiryDate) return false;
      const expDate = new Date(driver.licenseExpiryDate);
      if (isNaN(expDate.getTime())) return false;
      return expDate >= todayStart && expDate <= maxExpiryDate;
    });

    res.status(200).json(expiredDrivers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
