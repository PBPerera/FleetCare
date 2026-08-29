import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    driver_id: {
      type: Number,
      required: true,
      unique: true,
    },
    nic_no: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_no: {
      type: String,
      required: true,
    },
    licenseNo: {
      type: String,
      required: true,
      unique: true,
    },
    registerDate: {
      type: Date,
      required: true,
    },
    licenseRenewalDate: {
      type: Date,
      required: true,
    },
    licenseExpiryDate: {
      type: Date,
      required: true,
    },
    healthAssessment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Active",
    },
    // Trip assignment state - separate from the driver's own condition
    // (status above). Set to "Assigned" automatically when a vehicle
    // request using this driver is approved; only reset back to
    // "Available for Trip" by a staff member manually, once the trip
    // is finished.
    tripStatus: {
      type: String,
      enum: ["Available for Trip", "Assigned"],
      default: "Available for Trip",
    },
    tripDate: {
      type: Date,
      default: null,
    },
    tripTime: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("drivers", driverSchema);
