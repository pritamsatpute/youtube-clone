// React
import {
  useCallback,
  useState,
} from "react";

// React Router
import {
  Outlet,
  useLocation,
} from "react-router-dom";

// Provider
import { useAuth } from "../providers/AuthProvider";

// Components
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

// Skeleton
import WatchSkeleton from "../components/Skeleton/WatchSkeleton/WatchSkeleton";

// Styles
import "./Layout.css";

// Component
export default function Layout() {
  // Location
  const location = useLocation();

  // Auth
  const {
    user,
    loading,
  } = useAuth();

  // Sidebar
  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(() => {
    const savedState =
      localStorage.getItem(
        "yt-sidebar-open",
      );

    return savedState !== "false";
  });

  // Toggle Sidebar
  const toggleSidebar =
    useCallback(() => {
      setIsSidebarOpen(
        (previous) => {
          const nextState =
            !previous;

          localStorage.setItem(
            "yt-sidebar-open",
            String(nextState),
          );

          return nextState;
        },
      );
    }, []);

  // Initial Loading
  if (loading) {
    return (
      <div className="yt-layout">
        <Header
          onMenuClick={toggleSidebar}
        />

        <Sidebar
          isOpen={isSidebarOpen}
          user={user}
        />

        <main
          className={`
            yt-main
            ${
              isSidebarOpen
                ? "yt-main--expanded"
                : "yt-main--collapsed"
            }
          `}
        >
          {location.pathname.startsWith(
            "/watch/",
          ) ? (
            <WatchSkeleton />
          ) : (
            <div className="yt-layout-loading" />
          )}
        </main>
      </div>
    );
  }

  // Render
  return (
    <div className="yt-layout">

      {/* Header */}
      <Header
        onMenuClick={toggleSidebar}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        user={user}
      />

      {/* Main */}
      <main
        className={`
          yt-main
          ${
            isSidebarOpen
              ? "yt-main--expanded"
              : "yt-main--collapsed"
          }
        `}
      >
        <Outlet />
      </main>

    </div>
  );
}