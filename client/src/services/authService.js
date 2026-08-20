// API
import api from "./api";

// Register
export const register = (data) =>
  api.post("/auth/register", data);

// Login
export const login = (data) =>
  api.post("/auth/login", data);

// Current User
export const getCurrentUser = () =>
  api.get("/auth/me");

// Logout
export const logout = () =>
  api.post("/auth/logout");