const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  tripDate: String,
  tripTime: String,
  purpose: String,           // pickup & destination
  vehicleId: String,
  driverName: String,
  contactNumber: String
});

module.exports = mongoose.model("Trip", TripSchema);
