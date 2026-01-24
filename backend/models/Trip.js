const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  tripDate: String,
  tripTime: String,
  destination: String,
  vehicleId: String,
  driverName: String,
  contact: String,
});

module.exports = mongoose.model("Trip", TripSchema);
