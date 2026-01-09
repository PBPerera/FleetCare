const mongoose = require('mongoose');


const NotificationSchema = new mongoose.Schema({
type: { // 'service' | 'trip' | 'insurance' | 'license' | etc.
type: String,
required: true,
index: true,
},
maintenanceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Maintenance', default: null },
vehicleId: { type: String, default: '' },
driverName: { type: String, default: '' },
driverId: { type: String, default: '' },
contactNo: { type: String, default: '' },
description: { type: String, default: '' },
companyName: { type: String, default: '' },
dueDate: { type: Date, default: null },
status: { type: String, default: 'Active' }, // Active | Resolved | Snoozed
read: { type: Boolean, default: false },
meta: { type: Object, default: {} },
}, { timestamps: true });

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or Staff model
      required: true,
    },

    role: {
      type: String,
      enum: ["staff", "admin", "driver"],
      default: "staff",
    },

    type: {
      type: String,
      enum: ["approved", "rejected", "info"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: String,
    from: String,
    reason: String,
    schedule: String,

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);

module.exports = mongoose.model('Notification', NotificationSchema);