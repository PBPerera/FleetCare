// const mongoose = require('mongoose');

// const DriverSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   licenseNumber: { type: String, required: true },
//   phone: String,
//   assignedVehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Driver', DriverSchema);


const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  driverId: String,
  name: String,
  licenseExpiry: Date,
  contact: String
});

module.exports = mongoose.model("Driver", DriverSchema);
