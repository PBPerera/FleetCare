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
  // Purely the operational/work status shown in the Repair Management
  // table's Status column - only ever "Assigned" or "Completed" can be
  // picked there, so those are the only real options here (plus '' for
  // "not started yet"). The approve/reject workflow state lives in
  // approvalStatus below, not here - keeping them separate is what makes
  // the Status dropdown and the Approve/Reject column behave correctly
  // at the same time.
  status: {
    type: String,
    enum: ['', 'Assigned', 'Completed'],
    default: ''
  },
  // Tracks the approve/reject workflow independently of the operational
  // status above. Set by approveRepair/rejectRepair (or repair.approve() /
  // repair.reject()) - never by editing the Status column.
  approvalStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
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
  // Set to true once the approval-process table (Pending Repair Approvals)
  // has had its Shift Date filled in. Until this is true, the Repair
  // Management table keeps Company Name / Shift Date / Complete Date /
  // Cost / Status locked for this record.
  processCompleted: {
    type: Boolean,
    default: false
  },
  createdBy: mongoose.Schema.Types.ObjectId,
  updatedBy: mongoose.Schema.Types.ObjectId
}, {
  timestamps: true
});

// Indexes
repairSchema.index({ maintenanceId: 1 });
repairSchema.index({ vehicleId: 1 });
repairSchema.index({ status: 1 });
repairSchema.index({ approvalStatus: 1 });
repairSchema.index({ requestDate: -1 });

// Methods
repairSchema.methods.approve = function(userId, comments) {
  // Only the approval workflow state changes here - status (Assigned /
  // Completed) and completeDate are untouched by approval, they get set
  // later, on purpose, when the work is actually assigned/finished.
  this.approvalStatus = 'Approved';
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
  this.approvalStatus = 'Rejected';
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