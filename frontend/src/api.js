import axios from "axios";
import { getBackendBaseUrl } from "./lib/apiBase";

const base = getBackendBaseUrl();
if (!import.meta.env.VITE_API_BASE_URL) console.warn("VITE_API_BASE_URL not set; using fallback:", base);
const API = axios.create({ baseURL: `${base}/api` });

export const sendOtp = (email) => API.post("/auth/forgot-password", { email });
export const verifyOtp = (email, otp) => API.post("/auth/verify-otp", { email, otp });
export const resetPassword = (email, password) =>
  API.post("/auth/reset-password", { email, newPassword: password });
export const resendOtp = (email) => API.post("/auth/resend-otp", { email });

export const addVehicle = (vehicleData) => API.post("/vehicle", vehicleData);
export const addDriver = (driverData) => API.post("/driver", driverData); 

export default API;