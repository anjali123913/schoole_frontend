import axios from "axios";

// Adjust if backend base changes
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: false
});
