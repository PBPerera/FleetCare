import mongoose from 'mongoose';

const repairSchema = new mongoose.Schema({
  maintenanceId: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  vehicleId: {
    type: String,
    required: false,
    trim: true,
    default: ''
  },
  driverName: {
    type: String,
    required: false,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    required: false,
    trim: true,
    default: ''
  },
  companyName: {
    type: String,
    required: false,
    trim: true,
    default: ''
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
    trim: true,
    default: ''
  },
  engineer: {
    type: String,
    trim: true,
    default: ''
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

// Indexes
repairSchema.index({ maintenanceId: 1 });
repairSchema.index({ vehicleId: 1 });
repairSchema.index({ status: 1 });
repairSchema.index({ requestDate: -1 });

// Methods
repairSchema.methods.approve = function(userId, comments) {
  this.status = 'Approved';
  this.approvalHistory.push({
    stage: 'Final Approval',
    approvedBy: userId,
    approvedAt: new Date(),
    comments: comments || '',
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

export default mongoose.model('Repair', repairSchema);