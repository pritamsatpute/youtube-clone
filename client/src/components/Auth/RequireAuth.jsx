// React Router
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

// Provider
import { useAuth } from "../../providers/AuthProvider";

// Require Auth
export default function RequireAuth() {
  const { user, loading } = useAuth();

  const location = useLocation();

  // Loading
  if (loading) {
    return null;
  }

  // Not Authenticated
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

  // Authenticated
  return <Outlet />;
}