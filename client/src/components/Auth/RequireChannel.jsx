// React Router
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

// Provider
import { useAuth } from "../../providers/AuthProvider";

// Component
export default function RequireChannel() {
  // Auth
  const { user, loading } =
    useAuth();

  // Router
  const location =
    useLocation();

  // Loading
  if (loading) {
    return null;
  }

  // No User
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // No Channel
  if (!user.channel) {
    return <Outlet />;
  }

  // Has Channel
  return <Outlet />;
}