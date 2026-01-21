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
<<<<<<< HEAD
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
=======
>>>>>>> 3af2a90d432a9ab42d92346f737d3ed164cb5c77
    status: {
      type: String,
      required: true,
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("vehicles", vehicalSchema);
