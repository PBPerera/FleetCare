

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
import Maintenance from "../models/Maintenance.js";
import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";

export const getAllNotifications = async (req, res) => {
  try {
    const today = new Date();

    // =========================================
    // 1️⃣ LATEST APPROVED TRIPS
    // =========================================
    const trips = await Trip.find({ status: "Approved" })
      .sort({ createdAt: -1 })
      .limit(5);

    const tripNotifications = trips.map((trip) => ({
      type: "trip",
      tripDate: trip.tripDate,
      tripTime: trip.tripTime,
      destination: trip.pickupDestination,
      vehicleId: trip.vehicleId,
      driver: trip.driverName,
      contact: trip.driverContact,
    }));

    // =========================================
    // 2️⃣ MAINTENANCE ALERTS
    // =========================================
    const maintenance = await Maintenance.find({ status: "Pending" });

    const maintenanceNotifications = maintenance.map((item) => ({
      type: "maintenance",
      vehicleId: item.vehicleId,
      driver: item.driverName,
      contact: item.contactNumber,
      description: item.description || item.message,
      company: item.companyName,
    }));

    // =========================================
    // 3️⃣ EXPIRED VEHICLE INSURANCE
    // =========================================
    const expiredInsurance = await Vehicle.find({
      insuranceExpiryDate: { $lt: today },
    });

    const insuranceNotifications = expiredInsurance.map((vehicle) => ({
      type: "insurance",
      vehicleId: vehicle.vehicleId,
      vehicleType: vehicle.vehicleType,
      expiryDate: vehicle.insuranceExpiryDate,
      driver: vehicle.driverName,
      contact: vehicle.contactNumber,
    }));

    // =========================================
    // 4️⃣ EXPIRED DRIVER LICENSE
    // =========================================
    const expiredLicenses = await Driver.find({
      licenseExpiryDate: { $lt: today },
    });

    const licenseNotifications = expiredLicenses.map((driver) => ({
      type: "license",
      driverId: driver.driverId,
      driver: driver.driverName,
      expiryDate: driver.licenseExpiryDate,
      contact: driver.contactNumber,
    }));

    // =========================================
    // COMBINE ALL
    // =========================================
    const allNotifications = [
      ...tripNotifications,
      ...maintenanceNotifications,
      ...insuranceNotifications,
      ...licenseNotifications,
    ];

    res.status(200).json(allNotifications);
  } catch (error) {
    console.error("Notification Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default controller;