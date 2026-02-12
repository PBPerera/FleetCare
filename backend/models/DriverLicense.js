const mongoose = require("mongoose");

const driverLicenseSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  driverName: { type: String, required: true },
  licenseExpiryDate: { type: Date, required: true },
  contactNumber: { type: String, required: true },
});

module.exports = mongoose.model(
  "DriverLicense",
  driverLicenseSchema
);
