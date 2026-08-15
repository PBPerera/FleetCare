import mongoose from "mongoose";

const LicenseSchema = new mongoose.Schema({
    driverId: String,
    driver: String,
    expiryDate: String,
    contact: String
});

export default mongoose.model("License", LicenseSchema);
