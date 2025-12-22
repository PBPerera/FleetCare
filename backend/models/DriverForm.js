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
}, { timestamps: true });

const DriverForm = mongoose.model("Driver", driverFormSchema);

<<<<<<< HEAD
export default DriverForm;
=======
export default DriverForm;
>>>>>>> 879ada679e825132febcdadc2d4ea122dd7293e3
