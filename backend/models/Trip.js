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
      type: Date,
      required: true,
    },
    tripTime: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    noOfPassengers: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Approved", "Rejected"],
      required: true,
    },
    vehicleRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicleRequests",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("trips", tripSchema);
