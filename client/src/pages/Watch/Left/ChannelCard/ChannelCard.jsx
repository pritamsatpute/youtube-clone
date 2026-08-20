// React
import {
  useEffect,
  useState,
} from "react";

// React Router
import { Link } from "react-router-dom";

// Provider
import { useAuth } from "../../../../providers/AuthProvider";

// Services
import {
  getChannelByHandle,
  getSubscriptionStatus,
  subscribeToChannel,
  unsubscribeFromChannel,
} from "../../../../services/channelService";

// Utils
import getMediaUrl from "../../../../utils/getMediaUrl";

// Styles
import "./ChannelCard.css";

// Component
export default function ChannelCard({
  video,
}) {
  // Auth
  const { user } = useAuth();

  // State
  const [channel, setChannel] =
    useState(null);

  const [subscribed, setSubscribed] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // Load Channel
  useEffect(() => {
    let mounted = true;

    const loadChannel =
      async () => {
        try {
          if (!video?.channelHandle) {
            return;
          }

          // Get Channel
          const response =
            await getChannelByHandle(
              video.channelHandle,
            );

          const channelData =
            response.data;

          if (!mounted) return;

          setChannel(channelData);

          // Check Subscription
          if (user?._id) {
            try {
              const statusResponse =
                await getSubscriptionStatus(
                  channelData._id,
                );

              if (!mounted) return;

              setSubscribed(
                Boolean(
                  statusResponse.data
                    ?.subscribed,
                ),
              );
            } catch (error) {
              console.error(
                "Failed to get subscription status:",
                error,
              );
            }
          }
        } catch (error) {
          console.error(
            "Failed to load channel:",
            error,
          );
        }
      };

    loadChannel();

    return () => {
      mounted = false;
    };
  }, [
    video?.channelHandle,
    user?._id,
  ]);

  // Subscribe / Unsubscribe
  const handleSubscription =
    async () => {
      if (!user?._id) {
        return;
      }

      if (!channel?._id) {
        return;
      }

      if (loading) {
        return;
      }

      // Prevent Own Channel
      if (
        String(channel.owner) ===
        String(user._id)
      ) {
        return;
      }

      try {
        setLoading(true);

        if (subscribed) {
          // Unsubscribe
          const response =
            await unsubscribeFromChannel(
              channel._id,
            );

          setSubscribed(false);

          setChannel((previous) => ({
            ...previous,
            subscribersCount:
              response.data
                ?.subscribersCount ??
              Math.max(
                0,
                Number(
                  previous?.subscribersCount ||
                    0,
                ) - 1,
              ),
          }));
        } else {
          // Subscribe
          const response =
            await subscribeToChannel(
              channel._id,
            );

          setSubscribed(true);

          setChannel((previous) => ({
            ...previous,
            subscribersCount:
              response.data
                ?.subscribersCount ??
              Number(
                previous?.subscribersCount ||
                  0,
              ) + 1,
          }));
        }
      } catch (error) {
        console.error(
          "Subscription failed:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

  // Subscriber Count
  const subscribers =
    Number(
      channel?.subscribersCount ??
        video?.subscribers ??
        0,
    ).toLocaleString();

  // Own Channel
  const isOwnChannel =
    Boolean(
      user?._id &&
        channel?.owner &&
        String(channel.owner) ===
          String(user._id),
    );

  // Render
  return (
    <section className="yt-watch-channel-card">

      {/* Avatar */}
      <Link
        to={`/channel/${video.channelHandle}`}
        className="yt-watch-channel-avatar-link"
      >
        <img
          src={getMediaUrl(
            channel?.avatar ||
              video.avatar,
          )}
          alt={
            channel?.channelName ||
            video.channel ||
            "Channel"
          }
          className="yt-watch-channel-avatar"
        />
      </Link>

      {/* Channel Info */}
      <div className="yt-watch-channel-info">

        {/* Channel Name */}
        <Link
          to={`/channel/${video.channelHandle}`}
          className="yt-watch-channel-name"
        >
          {channel?.channelName ||
            video.channel}
        </Link>

        {/* Subscribers */}
        <p className="yt-watch-channel-subscribers">
          {subscribers} subscribers
        </p>

      </div>

      {/* Subscribe */}
      {user && !isOwnChannel && (
        <button
          type="button"
          className={`yt-watch-subscribe-button ${
            subscribed
              ? "is-subscribed"
              : ""
          }`}
          onClick={
            handleSubscription
          }
          disabled={loading}
        >
          {loading
            ? "..."
            : subscribed
              ? "Subscribed"
              : "Subscribe"}
        </button>
      )}

    </section>
  );
}