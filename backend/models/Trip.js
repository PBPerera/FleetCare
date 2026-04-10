import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleId: {
      type: String,
      required: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    driverContact: {
      type: String,
      required: true,
    },
    pickupDestination: {
      type: String,
      required: true,
    },
    tripDate: {
      type: String,
      required: true,
    },
    tripTime: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
    },
    vehicleType: {
      type: String,
    },
    noOfPassengers: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    vehicleRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleRequest",
    }
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
