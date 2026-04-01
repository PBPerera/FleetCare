

// const Notification = require("../models/Notification");

// // ============================
// // GET ALL NOTIFICATIONS
// // ============================
// exports.getAll = async (req, res) => {
//   const filter = {};

//   // optional filters
//   if (req.query.type) filter.type = req.query.type;
//   if (req.query.vehicleId) filter.vehicleId = req.query.vehicleId;

//   try {
//     const notifications = await Notification.find(filter)
//       .sort({ createdAt: -1 })
//       .limit(100);

//     res.json(notifications);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ============================
// // GET BY ID
// // ============================
// exports.getById = async (req, res) => {
//   try {
//     const n = await Notification.findById(req.params.id);
//     if (!n) return res.status(404).json({ message: "Not found" });

//     res.json(n);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ============================
// // CREATE NOTIFICATION
// // ============================
// exports.create = async (req, res) => {
//   try {
//     const n = new Notification(req.body);
//     await n.save();
//     res.status(201).json(n);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ============================
// // UPDATE
// // ============================
// exports.update = async (req, res) => {
//   try {
//     const updated = await Notification.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ message: "Not found" });

//     res.json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ============================
// // DELETE
// // ============================
// exports.remove = async (req, res) => {
//   try {
//     await Notification.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import Trip from "../models/Trip.js";
import Service from "../models/Service.js";
import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";

export const getAllNotifications = async (req, res) => {
  try {
    const now = new Date();

    // 1. Trip schedule (approved trips)
    const trips = await Trip.find({ status: "Approved" })
      .sort({ createdAt: -1 })
      .limit(100);

    const tripSchedule = trips.map((trip) => ({
      tripDate: trip.tripDate,
      tripTime: trip.tripTime,
      pickupDestination: trip.pickupDestination,
      vehicleId: trip.vehicleId,
      driverName: trip.driverName,
      contactNo: trip.driverContact,
    }));

    // 2. Maintenance alerts for services (use Service model)
    const maintenanceRecords = await Service.find({
      status: { $in: ["Scheduled", "In Progress", "Pending"] },
    }).sort({ date: 1 });

    const maintenanceAlerts = maintenanceRecords.map((item) => ({
      vehicleId: item.vehicleId,
      driverName: item.driverName,
      contactNo: item.contactNumber || "N/A",
      description: item.description || "No description",
      companyName: item.companyName || "N/A",
    }));

    // 3. Expired vehicle insurance
    const expiredInsuranceItems = await Vehicle.find({
      insurance_expiry: { $lt: now },
    });

    const expiredInsurance = expiredInsuranceItems.map((vehicle) => ({
      vehicleId: vehicle.vehicle_id || vehicle.vehicleId || "N/A",
      vehicleType: vehicle.type || "N/A",
      expiryDate: vehicle.insurance_expiry,
      driverName: vehicle.driverName || "Unassigned",
      contactNo: vehicle.driverContact || vehicle.contactNumber || "N/A",
    }));

    // 4. Expired driver license
    const expiredDrivers = await Driver.find({
      licenseExpiryDate: { $lt: now },
    });

    const expiredLicenses = expiredDrivers.map((driver) => ({
      driverId: driver.driver_id || driver._id,
      driverName: driver.name || "Unknown",
      licenceExpiryDate: driver.licenseExpiryDate,
      contactNo: driver.phone_no || driver.contactNumber || "N/A",
    }));

    const result = {
      tripSchedule,
      maintenanceAlerts,
      expiredInsurance,
      expiredLicenses,
    };

    const type = req.query.type;
    if (type) {
      switch (type) {
        case "trip":
          return res.json(tripSchedule);
        case "maintenance":
          return res.json(maintenanceAlerts);
        case "insurance":
          return res.json(expiredInsurance);
        case "license":
          return res.json(expiredLicenses);
        default:
          return res.status(400).json({ message: "Invalid type" });
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Notification Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default { getAllNotifications };