// Styles
import "./ChannelFilter.css";

// Component
export default function ChannelFilter({
  channels = [],
  selectedChannel,
  onSelect,
}) {
  // Render
  return (
    <nav className="subscription-channel-filter">
      {/* All */}
      <button
        type="button"
        className={
          selectedChannel ===
          "All"
            ? "active"
            : ""
        }
        onClick={() =>
          onSelect?.("All")
        }
      >
        All
      </button>

      {/* Channels */}
      {channels.map((channel) => (
        <button
          key={channel._id}
          type="button"
          className={
            selectedChannel ===
            channel.handle
              ? "active"
              : ""
          }
          onClick={() =>
            onSelect?.(
              channel.handle,
            )
          }
        >
          {channel.channelName}
        </button>
      ))}
    </nav>
  );
}