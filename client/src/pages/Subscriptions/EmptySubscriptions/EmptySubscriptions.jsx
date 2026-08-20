// Icons
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";

// Styles
import "./EmptySubscriptions.css";

// Component
export default function EmptySubscriptions() {
  // Render
  return (
    <div className="empty-subscriptions">
      {/* Icon */}
      <div className="empty-subscriptions-icon">
        <SubscriptionsOutlinedIcon />
      </div>

      {/* Title */}
      <h2>
        No subscription videos
      </h2>

      {/* Description */}
      <p>
        Subscribe to channels to see
        their latest videos here.
      </p>
    </div>
  );
}