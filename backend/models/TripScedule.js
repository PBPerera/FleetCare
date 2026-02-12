const mongoose = require("mongoose");

const TripScheduleSchema = new mongoose.Schema({
    date: String,
    time: String,
    destination: String,
    vehicleId: String,
    driver: String,
    contact: String
});

module.exports = mongoose.model("TripSchedule", TripScheduleSchema);
