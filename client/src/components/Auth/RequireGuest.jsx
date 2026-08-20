// React Router
import {
  Navigate,
  Outlet,
} from "react-router-dom";

// Provider
import { useAuth } from "../../providers/AuthProvider";

// Component
export default function RequireGuest() {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
}