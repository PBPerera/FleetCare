

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
import Repair from "../models/Repair.js";

export const getAllNotifications = async (req, res) => {
  try {
    const now = new Date();

    // 1. Trip schedule (Show approved trips starting 3 days before trip date until the day ends)
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const maxExpiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999);

    const approvedTrips = await Trip.find({ status: "Approved" })
      .sort({ tripDate: 1 })
      .limit(100);

    const filteredTrips = approvedTrips.filter((trip) => {
      if (!trip.tripDate) return false;
      const tDate = new Date(trip.tripDate);
      if (isNaN(tDate.getTime())) return false;
      if (tDate < todayStart || tDate > maxExpiryDate) return false;
      const vId = (trip.vehicleId || "").trim();
      const drv = (trip.driverName || "").trim();
      if ((!vId || vId === "N/A") && (!drv || drv === "N/A")) return false;
      return true;
    });

    const tripSchedule = filteredTrips.map((trip) => ({
      tripDate: trip.tripDate,
      tripTime: trip.tripTime,
      pickupDestination: trip.pickupDestination,
      vehicleId: trip.vehicleId,
      driverName: trip.driverName,
      contactNo: trip.driverContact,
    }));

    // 2. Maintenance alerts for services and repairs (Show items starting 3 days before date until day ends)
    const [serviceRecords, repairRecords] = await Promise.all([
      Service.find().sort({ date: 1 }).limit(100),
      Repair.find({ approvalStatus: { $ne: "Rejected" } }).sort({ requestDate: 1 }).limit(100),
    ]);

    const combinedMaintenance = [
      ...serviceRecords.map((s) => ({ ...s.toObject(), maintenanceDate: s.shiftDate || s.date })),
      ...repairRecords.map((r) => ({ ...r.toObject(), maintenanceDate: r.shiftDate || r.requestDate })),
    ];

    const filteredMaintenance = combinedMaintenance.filter((item) => {
      if (!item.maintenanceDate) return false;
      const mDate = new Date(item.maintenanceDate);
      if (isNaN(mDate.getTime())) return false;
      if (mDate < todayStart || mDate > maxExpiryDate) return false;
      const vId = (item.vehicleId || "").trim();
      const drv = (item.driverName || "").trim();
      const desc = (item.description || "").trim();
      if (
        (!vId || vId === "N/A") &&
        (!drv || drv === "N/A") &&
        (!desc || desc === "N/A" || desc === "No description")
      ) {
        return false;
      }
      return true;
    });

    const maintenanceAlerts = await Promise.all(
      filteredMaintenance.map(async (item) => {
        let contactNo = item.contactNo || item.contact || "N/A";
        if (contactNo === "N/A" && item.driverName && item.driverName !== "N/A") {
          const driver = await Driver.findOne({
            name: { $regex: new RegExp(`^${item.driverName.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, "i") }
          });
          if (driver && driver.phone_no) {
            contactNo = driver.phone_no;
          }
        }
        return {
          vehicleId: item.vehicleId || "N/A",
          driverName: item.driverName || "N/A",
          contactNo: contactNo,
          description: item.description || "No description",
          companyName: item.companyName || "N/A",
          maintenanceDate: item.maintenanceDate,
        };
      })
    );

    // 3. Expired vehicle insurance (Show items starting 3 days before expiry date until the day ends)
    const allVehicles = await Vehicle.find()
      .sort({ insurance_expiry: 1 })
      .limit(100);

    const expiredInsuranceItems = allVehicles.filter((vehicle) => {
      if (!vehicle.insurance_expiry) return false;
      const expDate = new Date(vehicle.insurance_expiry);
      if (isNaN(expDate.getTime())) return false;
      if (expDate < todayStart || expDate > maxExpiryDate) return false;
      const vId = String(vehicle.vehicle_id || vehicle.vehicleId || "").trim();
      if (!vId || vId === "N/A") return false;
      return true;
    });

    const expiredInsurance = await Promise.all(
      expiredInsuranceItems.map(async (vehicle) => {
        let driverName = "Unassigned";
        let contactNo = "N/A";

        // Find the latest trip for this vehicle to identify the driver
        const latestTrip = await Trip.findOne({ 
          vehicleId: String(vehicle.vehicle_id) 
        }).sort({ createdAt: -1 });

        if (latestTrip && latestTrip.driverName) {
          driverName = latestTrip.driverName;
          // Find contact info from Driver model
          const driver = await Driver.findOne({ name: driverName });
          if (driver && driver.phone_no) {
            contactNo = driver.phone_no;
          } else {
            contactNo = latestTrip.driverContact || "N/A";
          }
        }

        return {
          vehicleId: vehicle.vehicle_id || vehicle.vehicleId || "N/A",
          vehicleType: vehicle.type || "N/A",
          expiryDate: vehicle.insurance_expiry,
          driverName: driverName,
          contactNo: contactNo,
        };
      })
    );

    // 4. Expired driver license (Show items starting 3 days before expiry date until the day ends)
    const allDrivers = await Driver.find()
      .sort({ licenseExpiryDate: 1 })
      .limit(100);

    const expiredDrivers = allDrivers.filter((driver) => {
      if (!driver.licenseExpiryDate) return false;
      const expDate = new Date(driver.licenseExpiryDate);
      if (isNaN(expDate.getTime())) return false;
      if (expDate < todayStart || expDate > maxExpiryDate) return false;
      const dId = String(driver.driver_id || driver._id || "").trim();
      const dName = String(driver.name || "").trim();
      if ((!dId || dId === "N/A") && (!dName || dName === "N/A" || dName === "Unknown")) return false;
      return true;
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