// React Router
import { Routes, Route } from "react-router-dom";

// Layout
import Layout from "../layouts/Layout";

// Auth
import RequireAuth from "../components/Auth/RequireAuth";
import RequireChannel from "../components/Auth/RequireChannel";
import RequireGuest from "../components/Auth/RequireGuest";

// Authentication
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";

// Main Pages
import Home from "../pages/Home/Home";
import Watch from "../pages/Watch/Watch";
import Search from "../pages/Search/Search";
import Subscriptions from "../pages/Subscriptions/Subscriptions";

import History from "../pages/History/History";
import LikedVideos from "../pages/LikedVideos/LikedVideos";

// Channel
import Channel from "../pages/Channel/Channel";
import ChannelHome from "../pages/Channel/Home/ChannelHome";
import ChannelVideos from "../pages/Channel/Videos/ChannelVideos";

// Component
export default function AppRoutes() {
  return (
    <Routes>
      {/* Authentication */}
      <Route element={<RequireGuest />}>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />
      </Route>

      {/* Main Application */}
      <Route element={<Layout />}>
        {/* Home */}
        <Route
          index
          element={<Home />}
        />

        {/* Search */}
        <Route
          path="/results"
          element={<Search />}
        />

        {/* Subscriptions */}
        <Route
          path="/subscriptions"
          element={<Subscriptions />}
        />

        {/* Watch */}
        <Route
          path="/watch/:id"
          element={<Watch />}
        />

        {/* History */}
        <Route
          path="/history"
          element={<History />}
        />

        {/* Liked Videos */}
        <Route
          path="/liked-videos"
          element={<LikedVideos />}
        />

        {/* Channel */}
        <Route
          path="/channel/:handle"
          element={<Channel />}
        >
          <Route
            index
            element={<ChannelHome />}
          />

          <Route
            path="videos"
            element={<ChannelVideos />}
          />
        </Route>
        
      </Route>
    </Routes>
  );
}