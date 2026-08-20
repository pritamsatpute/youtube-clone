// Components
import SubscriptionChannelCard from "../SubscriptionChannelCard/SubscriptionChannelCard";

// Styles
import "./SubscriptionSidebar.css";

// Component
export default function SubscriptionSidebar({
  channels = [],
  selectedChannel,
  onSelect,
}) {
  // Render
  return (
    <aside className="subscriptions-sidebar">
      {/* Title */}
      <h2>
        Subscriptions
      </h2>

      {/* Channels */}
      <div className="subscriptions-sidebar-list">
        {channels.map(
          (channel) => (
            <SubscriptionChannelCard
              key={channel._id}
              channel={channel}
              active={
                selectedChannel ===
                channel.handle
              }
              onClick={() =>
                onSelect?.(
                  channel.handle,
                )
              }
            />
          ),
        )}
      </div>
    </aside>
  );
}