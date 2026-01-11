import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    default: Date.now
  },
  shiftDate: {
    type: Date,
    required: false
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

export default mongoose.model('Service', serviceSchema);