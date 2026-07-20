import mongoose from "mongoose";

const vehicleInsuranceSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true },
  vehicleType: { type: String, required: true },
  insuranceExpiryDate: { type: Date, required: true },
  driverName: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

export default mongoose.model("VehicleInsurance", vehicleInsuranceSchema);
