const mongoose = require("mongoose");

const InsuranceSchema = new mongoose.Schema({
    vehicleId: String,
    vehicleType: String,
    expiryDate: String,
    driver: String,
    contact: String
});

module.exports = mongoose.model("Insurance", InsuranceSchema);
