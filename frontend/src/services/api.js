import axios from "axios";
import { getBackendBaseUrl } from "../lib/apiBase";

const base = getBackendBaseUrl();

const API = axios.create({
  baseURL: base, // your backend URL
});

export default API;
