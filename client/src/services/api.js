// Token
import { getToken } from "./tokenService";

// API Base URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/v1";

// API Request
const request = async (
  endpoint,
  options = {}
) => {
  // Token
  const token = getToken();

  // FormData Check
  const isFormData =
    options.body instanceof FormData;

  // Headers
  const headers = {
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
    ...options.headers,
  };

  // JSON Requests
  if (!isFormData) {
    headers["Content-Type"] =
      "application/json";
  }

  // Request
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  // Response
  const result =
    await response.json();

  // Error
  if (!response.ok) {
    const error = new Error(
      result.message ||
      "Request failed"
    );

    error.status =
      response.status;

    error.data = result;

    throw error;
  }

  return result;
};

// API
const api = {
  get: (endpoint) =>
    request(endpoint),

  post: (
    endpoint,
    body,
    options = {},
  ) =>
    request(endpoint, {
      method: "POST",
      body:
        body instanceof FormData
          ? body
          : JSON.stringify(body),
      ...options,
    }),

  patch: (endpoint, body) =>
    request(endpoint, {
      method: "PATCH",
      body:
        body instanceof FormData
          ? body
          : JSON.stringify(body),
    }),

  put: (endpoint, body) =>
    request(endpoint, {
      method: "PUT",
      body:
        body instanceof FormData
          ? body
          : JSON.stringify(body),
    }),

  delete: (endpoint) =>
    request(endpoint, {
      method: "DELETE",
    }),
};

export default api;