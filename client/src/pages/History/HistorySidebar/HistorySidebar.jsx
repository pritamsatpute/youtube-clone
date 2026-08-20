// React
import { useState } from "react";

// Icons
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// Styles
import "./HistorySidebar.css";

// Actions
const actions = [
  {
    id: "clear",
    label: "Clear all watch history",
    icon: DeleteSweepOutlinedIcon,
  },
  {
    id: "pause",
    label: "Pause watch history",
    icon: PauseCircleOutlineOutlinedIcon,
  },
  {
    id: "manage",
    label: "Manage all history",
    icon: SettingsOutlinedIcon,
  },
];

// Component
export default function HistorySidebar({
  historyPaused = false,
  onClear,
  onTogglePause,
  onManage,
}) {
  // State
  const [busy, setBusy] = useState(false);

  // Handle Action
  const handleAction = async (action) => {
    if (busy) {
      return;
    }

    try {
      setBusy(true);

      if (action === "clear") {
        await onClear?.();
      }

      if (action === "pause") {
        await onTogglePause?.();
      }

      if (action === "manage") {
        onManage?.();
      }
    } finally {
      setBusy(false);
    }
  };

  // Render
  return (
    <aside className="yt-history-sidebar">
      {/* Title */}
      <h2 className="yt-history-sidebar-title">
        History settings
      </h2>

      {/* Actions */}
      <div className="yt-history-sidebar-actions">
        {actions.map(
          ({
            id,
            label,
            icon: Icon,
          }) => {
            const isPauseAction =
              id === "pause";

            const actionLabel =
              isPauseAction &&
              historyPaused
                ? "Resume watch history"
                : label;

            return (
              <button
                key={id}
                type="button"
                className={`yt-history-sidebar-action ${
                  id === "clear"
                    ? "yt-history-sidebar-action--danger"
                    : ""
                }`}
                disabled={busy}
                onClick={() =>
                  handleAction(id)
                }
              >
                {/* Icon */}
                <Icon className="yt-history-sidebar-action-icon" />

                {/* Label */}
                <span>
                  {actionLabel}
                </span>
              </button>
            );
          },
        )}
      </div>

      {/* Information */}
      <p className="yt-history-sidebar-description">
        Manage your watch history,
        including pausing or clearing
        videos you've watched.
      </p>
    </aside>
  );
}