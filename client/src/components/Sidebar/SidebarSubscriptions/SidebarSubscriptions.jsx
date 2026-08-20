// React
import { useEffect, useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Services
import { getMySubscriptions } from "../../../services/channelService";

// Utils
import getMediaUrl from "../../../utils/getMediaUrl";

// Styles
import "./SidebarSubscriptions.css";

// Component
export default function SidebarSubscriptions({
  collapsed = false,
  user = null,
}) {
  // State
  const [subscriptions, setSubscriptions] = useState([]);

  const [loading, setLoading] = useState(false);

  // Load Subscriptions
  useEffect(() => {
    // Guest
    if (!user) {
      setSubscriptions([]);
      return;
    }

    const loadSubscriptions = async () => {
      try {
        setLoading(true);

        const response =
          await getMySubscriptions();

        setSubscriptions(
          response.data || [],
        );
      } catch (error) {
        console.error(
          "Failed to load subscriptions:",
          error,
        );

        setSubscriptions([]);
      } finally {
        setLoading(false);
      }
    };

    loadSubscriptions();
  }, [user]);

  // Mini Sidebar
  if (collapsed) {
    return null;
  }

  // Render
  return (
    <section className="yt-sidebar-section">

      {/* Section Header */}
      <div className="yt-sidebar-section-header">
        <h3 className="yt-sidebar-section-title">
          Subscriptions
        </h3>
      </div>

      {/* Loading */}
      {loading && (
        <div className="yt-sidebar-subscriptions-loading">
          Loading...
        </div>
      )}

      {/* Subscriptions */}
      {!loading &&
        subscriptions.map((channel) => (
          <Link
            key={channel._id}
            to={`/channel/${channel.handle}`}
            className="yt-sidebar-subscription"
          >
            {/* Avatar */}
            <img
              src={getMediaUrl(
                channel.avatar,
              )}
              alt={channel.channelName}
              className="yt-sidebar-subscription-avatar"
            />

            {/* Channel Name */}
            <span className="yt-sidebar-subscription-name">
              {channel.channelName}
            </span>
          </Link>
        ))}

      {/* Empty State */}
      {!loading &&
        subscriptions.length === 0 && (
          <p className="yt-sidebar-subscriptions-empty">
            No subscriptions yet
          </p>
        )}

    </section>
  );
}