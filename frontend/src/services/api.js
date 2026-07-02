import axios from "axios";
import { BASE_URL } from "../utils/constants";

// ==========================================
// Axios Instance
// ==========================================

const api = axios.create({
  baseURL: BASE_URL,
});

// ==========================================
// Attach JWT Token Automatically
// ==========================================

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;