const mongoose = require("mongoose");

const tripRequestSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  tripId: String,
  destination: String,
  schedule: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("TripRequest", tripRequestSchema);
