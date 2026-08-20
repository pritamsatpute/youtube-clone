// React
import {
  useEffect,
  useMemo,
  useState,
} from "react";

// React Router
import { Link } from "react-router-dom";

// Provider
import { useAuth } from "../../providers/AuthProvider";

// Services
import {
  getMySubscriptions,
  getMySubscriptionVideos,
} from "../../services/channelService";

// Icons
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";

// Components
import SubscriptionHeader from "./SubscriptionHeader/SubscriptionHeader";
import ChannelFilter from "./ChannelFilter/ChannelFilter";
import SubscriptionFeed from "./SubscriptionFeed/SubscriptionFeed";
import SubscriptionSidebar from "./SubscriptionSidebar/SubscriptionSidebar";
import EmptySubscriptions from "./EmptySubscriptions/EmptySubscriptions";
import SkeletonList from "../../components/Skeleton/SkeletonList/SkeletonList";

// Styles
import "./Subscriptions.css";

// Component
export default function Subscriptions() {
  // Auth
  const { user } = useAuth();

  // State
  const [channels, setChannels] =
    useState([]);

  const [videos, setVideos] =
    useState([]);

  const [selectedChannel, setSelectedChannel] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // Load Subscriptions
  useEffect(() => {
    // Guest
    if (!user) {
      setChannels([]);
      setVideos([]);
      setLoading(false);
      setError("");

      return;
    }

    // Load User Subscriptions
    const loadSubscriptions =
      async () => {
        try {
          setLoading(true);
          setError("");

          // Channels
          const channelsResponse =
            await getMySubscriptions();

          // Videos
          const videosResponse =
            await getMySubscriptionVideos();

          setChannels(
            channelsResponse.data || [],
          );

          setVideos(
            videosResponse.data || [],
          );
        } catch (err) {
          setError(
            err.message ||
              "Failed to load subscriptions.",
          );
        } finally {
          setLoading(false);
        }
      };

    loadSubscriptions();
  }, [user]);

  // Filter Videos
  const filteredVideos =
    useMemo(() => {
      if (
        selectedChannel === "All"
      ) {
        return videos;
      }

      return videos.filter(
        (video) =>
          video.channelHandle ===
          selectedChannel,
      );
    }, [
      videos,
      selectedChannel,
    ]);

  // Guest State
  if (!user) {
    return (
      <div className="subscriptions-page subscriptions-page-guest">

        {/* Header */}
        <SubscriptionHeader />

        {/* Guest Content */}
        <div className="subscriptions-guest-content">

          {/* Icon */}
          <div className="subscriptions-guest-icon">
            <SubscriptionsOutlinedIcon />
          </div>

          {/* Title */}
          <h2>
            Don't miss new videos
          </h2>

          {/* Description */}
          <p>
            Sign in to see updates from
            your favorite YouTube channels.
          </p>

          {/* Sign In */}
          <Link
            to="/login"
            className="subscriptions-guest-signin"
          >
            Sign in
          </Link>

        </div>

      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="subscriptions-page-state subscriptions-page-error">
        {error}
      </div>
    );
  }

  // Render
  return (
    <div className="subscriptions-page">

      {/* Header */}
      <SubscriptionHeader />

      {/* Loading */}
      {loading ? (
        <main className="subscriptions-main">

          <div className="subscriptions-feed">

            <SkeletonList
              count={8}
              type="video"
            />

          </div>

        </main>
      ) : (
        <>
          {/* Channel Filter */}
          {channels.length > 0 && (
            <ChannelFilter
              channels={channels}
              selectedChannel={
                selectedChannel
              }
              onSelect={
                setSelectedChannel
              }
            />
          )}

          {/* Main Content */}
          <div className="subscriptions-main">

            {/* Sidebar */}
            {channels.length > 0 && (
              <SubscriptionSidebar
                channels={channels}
                selectedChannel={
                  selectedChannel
                }
                onSelect={
                  setSelectedChannel
                }
              />
            )}

            {/* Feed */}
            <main className="subscriptions-feed">

              {filteredVideos.length ===
              0 ? (
                <EmptySubscriptions />
              ) : (
                <SubscriptionFeed
                  videos={filteredVideos}
                />
              )}

            </main>

          </div>
        </>
      )}

    </div>
  );
}