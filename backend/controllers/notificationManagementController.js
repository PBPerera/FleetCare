import Trip from "../models/Trip.js";
import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";
import Notification from "../models/Notification.js";
import Service from "../models/Service.js";
import Repair from "../models/Repair.js";

// ================= TRIP SCHEDULE =================
export const getTripSchedule = async (req, res) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const maxExpiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999);

  const approvedTrips = await Trip.find({ status: "Approved" }).sort({ tripDate: 1 });
  const filtered = approvedTrips.filter((trip) => {
    if (!trip.tripDate) return false;
    const tDate = new Date(trip.tripDate);
    if (isNaN(tDate.getTime())) return false;
    return tDate >= todayStart && tDate <= maxExpiryDate;
  });

  res.json(filtered);
};

// ================= MAINTENANCE =================
export const getMaintenanceAlerts = async (req, res) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const maxExpiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999);

  const [services, repairs] = await Promise.all([
    Service.find().sort({ date: 1 }),
    Repair.find({ status: "Approved" }).sort({ requestDate: 1 }),
  ]);

  const combined = [
    ...services.map((s) => ({ ...s.toObject(), maintenanceDate: s.date })),
    ...repairs.map((r) => ({ ...r.toObject(), maintenanceDate: r.requestDate })),
  ];

  const filtered = combined.filter((item) => {
    if (!item.maintenanceDate) return false;
    const mDate = new Date(item.maintenanceDate);
    if (isNaN(mDate.getTime())) return false;
    return mDate >= todayStart && mDate <= maxExpiryDate;
  });

  res.json(filtered);
};

// ================= EXPIRED INSURANCE =================
export const getExpiredInsurance = async (req, res) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const maxExpiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999);

  const allVehicles = await Vehicle.find().sort({ insurance_expiry: 1 });
  const expired = allVehicles.filter((vehicle) => {
    const expiry = vehicle.insurance_expiry || vehicle.insuranceExpiryDate;
    if (!expiry) return false;
    const expDate = new Date(expiry);
    if (isNaN(expDate.getTime())) return false;
    return expDate >= todayStart && expDate <= maxExpiryDate;
  });

  res.json(expired);
};

// ================= EXPIRED DRIVER LICENSE =================
export const getExpiredLicenses = async (req, res) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const maxExpiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999);

  const allDrivers = await Driver.find().sort({ licenseExpiryDate: 1 });
  const expired = allDrivers.filter((driver) => {
    if (!driver.licenseExpiryDate) return false;
    const expDate = new Date(driver.licenseExpiryDate);
    if (isNaN(expDate.getTime())) return false;
    return expDate >= todayStart && expDate <= maxExpiryDate;
  });

  res.json(expired);
};
