// const mongoose = require('mongoose');

// const TripSchema = new mongoose.Schema({
//   vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
//   driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
//   startKm: Number,
//   endKm: Number,
//   startTime: Date,
//   endTime: Date,
//   status: { type: String, enum: ['scheduled','ongoing','completed','cancelled'], default: 'scheduled' },
//   notes: String,
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Trip', TripSchema);


const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  date: String,
  time: String,
  destination: String,
  vehicleId: String,
  driver: String,
  contact: String
});

module.exports = mongoose.model("Trip", TripSchema);
