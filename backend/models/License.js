const mongoose = require("mongoose");

const LicenseSchema = new mongoose.Schema({
    driverId: String,
    driver: String,
    expiryDate: String,
    contact: String
});

module.exports = mongoose.model("License", LicenseSchema);
