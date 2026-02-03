import mongoose from "mongoose";

const regUserSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true
  },
  emailaddress: {
    type: String,
    required: true,
    unique: true
  },
  PhoneNumber: {
    type: String,
    required: true
  },
  NIC: {
    type: String,
    required: true,
    unique: true
  },
  DepartmentORUnit: {
    type: String,
    required: true
  },
  Role: {
    type: String,
    required: true
  },
  EmployeeID: {
    type: String,
    required: true,
    unique: true
  },
  Designation: {
    type: String,
    required: true
  },
  UserName: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("regUsers", regUserSchema);
