// Services
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../services/authService.js";

// Utils
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Register
export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  res.status(201).json(
    new ApiResponse(
      result.message,
      {
        token: result.token,
        user: result.user,
      }
    )
  );
});

// Login
export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  res.json(
    new ApiResponse(
      result.message,
      {
        token: result.token,
        user: result.user,
      }
    )
  );
});

// Current User
export const me = asyncHandler(async (req, res) => {
  const result = await getCurrentUser(req.user);

  res.json(
    new ApiResponse(
      "User fetched successfully",
      result.user
    )
  );
});

// Logout
export const logout = asyncHandler(async (req, res) => {
  const result = await logoutUser();

  res.json(
    new ApiResponse(
      result.message,
      null
    )
  );
});