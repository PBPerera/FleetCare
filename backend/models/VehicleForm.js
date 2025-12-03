import mongoose from "mongoose";

const vehicleFormSchema = new mongoose.Schema(
  {
    vehicleId: { type: String, required: true, unique: true },
    vehicleType: { type: String, required: true },

    wheelSerialNo: { type: String },
    wheelSize: { type: String },

    batteryNo: { type: String },
    chassisNo: { type: String },
    engineNo: { type: String },

    vehicleRegisterDate: { type: Date, required: true },

    insuranceExpiryDate: { type: Date, required: true },
    insuranceRenewalDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const VehicleForm = mongoose.model("Vehicle", vehicleFormSchema);

export default VehicleForm;
