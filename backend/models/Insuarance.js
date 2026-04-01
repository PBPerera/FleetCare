import mongoose from "mongoose";

const InsuranceSchema = new mongoose.Schema({
    vehicleId: String,
    vehicleType: String,
    expiryDate: String,
    driver: String,
    contact: String
});

export default mongoose.model("Insurance", InsuranceSchema);
