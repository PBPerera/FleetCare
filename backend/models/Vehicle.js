import mongoose from "mongoose";

const vehicalSchema = new mongoose.Schema(
  {
    vehicle_id: {
      type: Number,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    fuel_average: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    chassis_no: {
      type: String,
      required: true,
      unique: true,
    },
    engine_no: {
      type: String,
      required: true,
      unique: true,
    },
    battery_serial: {
      type: String,
      required: true,
    },
    insurance_expiry: {
      type: Date,
      required: true,
    },
    wheel_serial: {
      type: String,
      required: true,
    },
    wheel_size: {
      type: String,
      required: true,
    },
    register_date: {
      type: Date,
      required: true,
    },
    insurance_renewal_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Active",
    },
    // Trip assignment state - separate from the vehicle's own condition
    // (status above). Set to "Assigned" automatically when a vehicle
    // request using this vehicle is approved; only reset back to
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

export default mongoose.model("vehicles", vehicalSchema);
