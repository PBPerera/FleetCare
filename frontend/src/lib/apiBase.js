const FALLBACK_BACKEND_URL = "http://localhost:5000";

export const getBackendBaseUrl = () => {
  const rawUrl = import.meta.env.VITE_API_BASE_URL;
  const value = (rawUrl && rawUrl.trim() !== "" ? rawUrl : FALLBACK_BACKEND_URL).trim();

  return value.replace(/\/+$/, "");
};

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getBackendBaseUrl()}/api${normalizedPath}`;
};