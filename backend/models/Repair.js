// models/Repair.js
const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
  maintenanceId: {
    type: String,
    unique: true,
    default: function() {
      return `R${String(Date.now()).slice(-6)}`;
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
  requestDate: {
    type: Date,
    default: Date.now
  },
  shiftDate: {
    type: Date
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
    enum: ['Pending', 'Approved', 'Rejected', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  developmentOfficer: {
    type: String,
    trim: true
  },
  engineer: {
    type: String,
    trim: true
  },
  engineerDate: {
    type: Date
  },
  procurementStage1: {
    type: String,
    enum: ['', 'Pending', 'Approved', 'Rejected'],
    default: ''
  },
  tenderCall: {
    type: String,
    enum: ['', 'Not Started', 'In Progress', 'Completed'],
    default: ''
  },
  procurementStage2: {
    type: String,
    enum: ['', 'Pending', 'Approved', 'Rejected'],
    default: ''
  },
  approvalHistory: [{
    stage: String,
    approvedBy: mongoose.Schema.Types.ObjectId,
    approvedAt: Date,
    comments: String,
    action: String
  }],
  rejectionReason: String,
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  notes: String,
  createdBy: mongoose.Schema.Types.ObjectId,
  updatedBy: mongoose.Schema.Types.ObjectId
}, {
  timestamps: true
});

repairSchema.index({ maintenanceId: 1 });
repairSchema.index({ vehicleId: 1 });
repairSchema.index({ status: 1 });
repairSchema.index({ requestDate: -1 });

repairSchema.methods.approve = function(userId, comments) {
  this.status = 'Approved';
  this.approvalHistory.push({
    stage: 'Final Approval',
    approvedBy: userId,
    approvedAt: new Date(),
    comments: comments,
    action: 'Approved'
  });
  return this.save();
};

repairSchema.methods.reject = function(userId, reason) {
  this.status = 'Rejected';
  this.rejectionReason = reason;
  this.approvalHistory.push({
    stage: 'Final Approval',
    approvedBy: userId,
    approvedAt: new Date(),
    comments: reason,
    action: 'Rejected'
  });
  return this.save();
};

module.exports = mongoose.model('Repair', repairSchema);