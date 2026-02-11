import mongoose from "mongoose";

const driverFormSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  nicNo: { type: String, required: true, unique: true },
  licenseNo: { type: String, required: true },
  licenseExpiryDate: { type: Date, required: true },
  licenseRenewalDate: { type: Date, required: true },
  healthAssessment: { type: String },
}, { timestamps: true, collection: "driverform"  });

const DriverForm = mongoose.model("DriverForm", driverFormSchema);

export default DriverForm;
