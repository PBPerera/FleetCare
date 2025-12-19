const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleId: String,
  type: String,
  wheelSerial: String,
  wheelSize: String,
  engineNo: String,
  batteryNo: String,
  chassisNo: String,
  registerdate: String,
  insurancerenewaldate: String,
  insuranceExpiry: String,
  status: String,
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);
