import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
});

export const sendOtp = (email) => API.post("/auth/forgot-password", { email });
export const verifyOtp = (email, otp) => API.post("/auth/verify-otp", { email, otp });
export const resetPassword = (email, password) =>
  API.post("/auth/reset-password", { email, password });

export default API;
