// Default Avatar
import defaultAvatar from "../assets/images/default-avatar.png";

// API Base URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/v1";

// Server URL
const SERVER_URL = API_BASE_URL.replace(
  /\/api\/v1\/?$/,
  "",
);

// Get Media URL
export default function getMediaUrl(
  mediaPath,
) {
  // Empty
  if (!mediaPath) {
    return defaultAvatar;
  }

  // Convert to string
  const path = String(mediaPath).trim();

  // Empty after trim
  if (!path) {
    return defaultAvatar;
  }

  // Default Avatar
  if (
    path === "/images/default-avatar.png" ||
    path === "images/default-avatar.png"
  ) {
    return defaultAvatar;
  }

  // Already absolute URL
  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  // Data URL
  if (
    path.startsWith("data:image/")
  ) {
    return path;
  }

  // Uploaded media
  if (
    path.startsWith("/uploads/")
  ) {
    return `${SERVER_URL}${path}`;
  }

  // Uploaded media without leading slash
  if (
    path.startsWith("uploads/")
  ) {
    return `${SERVER_URL}/${path}`;
  }

  // Local public assets
  if (path.startsWith("/")) {
    return path;
  }

  // Fallback
  return `/${path}`;
}