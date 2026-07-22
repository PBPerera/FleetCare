import axios from "axios";

const ENV_BACKEND = import.meta.env.VITE_API_BASE_URL;
const FALLBACK = "http://localhost:5000";
const base = (ENV_BACKEND && ENV_BACKEND.trim() !== "" ? ENV_BACKEND : FALLBACK).replace(/\/+$/, "");

const API = axios.create({
  baseURL: base, // your backend URL
});

export default API;
