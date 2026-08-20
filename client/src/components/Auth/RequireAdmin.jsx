import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuth } from "../../providers/AuthProvider";

export default function RequireAdmin() {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return null;
  }

  if (!user?.isAdmin) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
}