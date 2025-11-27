// models/Repair.js
const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
  maintenanceId: {
    type: String,
    required: true,
    unique: true,
    default: function() {
      return `R${String(Date.now()).slice(-6)}`;
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
  requestDate: {
    type: Date,
    required: [true, 'Request date is required'],
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
  
  // Approval workflow fields
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
  
  // Approval history
  approvalHistory: [{
    stage: String,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedAt: Date,
    comments: String,
    action: {
      type: String,
      enum: ['Approved', 'Rejected']
    }
  }],
  
  rejectionReason: {
    type: String,
    trim: true
  },
  
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  
  attachments: [{
    filename: String,
    url: String,
    uploadedAt: Date
  }],
  
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

// Indexes
repairSchema.index({ maintenanceId: 1 });
repairSchema.index({ vehicleId: 1 });
repairSchema.index({ status: 1 });
repairSchema.index({ requestDate: -1 });
repairSchema.index({ priority: 1 });

// Virtual for approval status
repairSchema.virtual('isFullyApproved').get(function() {
  return this.procurementStage1 === 'Approved' && 
         this.procurementStage2 === 'Approved' &&
         this.status === 'Approved';
});

// Method to approve repair
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

// Method to reject repair
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