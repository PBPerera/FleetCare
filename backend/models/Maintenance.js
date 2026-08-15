// const mongoose = require("mongoose");

// const MaintenanceSchema = new mongoose.Schema({
//     vehicleId: String,
//     driver: String,
//     contact: String,
//     description: String,
//     company: String
// });

// module.exports = mongoose.model("Maintenance", MaintenanceSchema);


import mongoose from "mongoose";

const MaintenanceSchema = new mongoose.Schema({
  vehicleId: String,
  driver: String,
  contact: String,
  description: String,
  company: String,
  date: Date
});

export default mongoose.model("Maintenance", MaintenanceSchema);