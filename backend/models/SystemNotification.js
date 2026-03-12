const mongoose = require("mongoose");

const SystemNotificationSchema = new mongoose.Schema(
  {
    type: {
      type: String, // service | insurance | license | etc
      required: true,
      index: true,
    },
    maintenanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Maintenance",
      default: null,
    },
    vehicleId: { type: String, default: "" },
    driverName: { type: String, default: "" },
    driverId: { type: String, default: "" },
    contactNo: { type: String, default: "" },
    description: { type: String, default: "" },
    companyName: { type: String, default: "" },
    dueDate: { type: Date, default: null },
    status: { type: String, default: "Active" },
    read: { type: Boolean, default: false },
    meta: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SystemNotification", SystemNotificationSchema);
