// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  maintenanceId: {
    type: String,
    unique: true,
    default: function() {
      return `M${String(Date.now()).slice(-6)}`;
    }
  },
  vehicleId: {
    type: String,
    required: false,  // ✅ Changed to false
    trim: true,
    default: 'N/A'
  },
  driverName: {
    type: String,
    required: false,  // ✅ Changed to false
    trim: true,
    default: 'N/A'
  },
  description: {
    type: String,
    required: false,  // ✅ Changed to false
    trim: true,
    default: 'N/A'
  },
  companyName: {
    type: String,
    required: false,  // ✅ Changed to false
    trim: true,
    default: 'N/A'
  },
  date: {
    type: Date,
    default: Date.now
  },
  shiftDate: {
    type: Date,
    required: false  // ✅ Changed to false
  },
  completeDate: {
    type: Date
  },
  cost: {
    type: Number,
    default: 0,
    min: [0, 'Cost cannot be negative']
  },
  status: {
    type: String,
    enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  },
  notes: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

serviceSchema.index({ maintenanceId: 1 });
serviceSchema.index({ vehicleId: 1 });
serviceSchema.index({ date: -1 });
serviceSchema.index({ status: 1 });

module.exports = mongoose.model('Service', serviceSchema);