// Utils
import getMediaUrl from "../../../utils/getMediaUrl";

// Styles
import "./SubscriptionChannelCard.css";

// Component
export default function SubscriptionChannelCard({
  channel,
  active = false,
  onClick,
}) {
  // Handle
  const handle = channel.handle
    ? `@${channel.handle.replace(/^@/, "")}`
    : "";

  // Render
  return (
    <button
      type="button"
      className={`subscription-channel-card ${
        active ? "active" : ""
      }`}
      onClick={onClick}
    >
      {/* Avatar */}
      <img
        src={getMediaUrl(channel.avatar)}
        alt={
          channel.channelName ||
          "Channel"
        }
        className="subscription-channel-avatar"
      />

      {/* Channel Info */}
      <span className="subscription-channel-info">
        <span className="subscription-channel-name">
          {channel.channelName}
        </span>

        <span className="subscription-channel-handle">
          {handle}
        </span>
      </span>
    </button>
  );
}