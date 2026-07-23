import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_BASE_URL.replace(/\/+$/, "")}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendOtp = (email) =>
  API.post("/auth/forgot-password", { email });

export const verifyOtp = (email, otp) =>
  API.post("/auth/verify-otp", { email, otp });

export const resetPassword = (email, password) =>
  API.post("/auth/reset-password", {
    email,
    newPassword: password,
  });

export const resendOtp = (email) =>
  API.post("/auth/resend-otp", { email });

export const addVehicle = (vehicleData) =>
  API.post("/vehicle", vehicleData);

export const addDriver = (driverData) =>
  API.post("/driver", driverData);

export default API;