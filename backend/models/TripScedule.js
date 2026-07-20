import mongoose from "mongoose";

const TripScheduleSchema = new mongoose.Schema({
    date: String,
    time: String,
    destination: String,
    vehicleId: String,
    driver: String,
    contact: String
});

export default mongoose.model("TripSchedule", TripScheduleSchema);
