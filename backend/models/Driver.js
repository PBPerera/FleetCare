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
  },
  { timestamps: true }
);

export default mongoose.model("drivers", driverSchema);
