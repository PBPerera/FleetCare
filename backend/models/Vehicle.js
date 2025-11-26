const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  model: String,
  make: String,
  year: Number,
  status: { type: String, enum: ['available','in_use','maintenance'], default: 'available' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
