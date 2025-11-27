// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  maintenanceId: {
    type: String,
    required: true,
    unique: true,
    default: function() {
      return `M${String(Date.now()).slice(-6)}`;
    }
  },
  vehicleId: {
    type: String,
    required: [true, 'Vehicle ID is required'],
    trim: true
  },
  driverName: {
    type: String,
    required: [true, 'Driver name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Maintenance date is required']
  },
  shiftDate: {
    type: Date,
    required: [true, 'Shift date is required']
  },
  completeDate: {
    type: Date
  },
  cost: {
    type: Number,
    required: [true, 'Cost is required'],
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

// Index for faster queries
serviceSchema.index({ maintenanceId: 1 });
serviceSchema.index({ vehicleId: 1 });
serviceSchema.index({ date: -1 });
serviceSchema.index({ status: 1 });

// Virtual for formatted cost
serviceSchema.virtual('formattedCost').get(function() {
  return `$${this.cost.toFixed(2)}`;
});

// Method to check if service is overdue
serviceSchema.methods.isOverdue = function() {
  if (this.status === 'Completed') return false;
  return new Date() > new Date(this.shiftDate);
};

module.exports = mongoose.model('Service', serviceSchema);