// Icons
import CloseIcon from "@mui/icons-material/Close";

// Components
import Dialog from "../../../ui/Dialog/Dialog";

// Styles
import "./KeyboardShortcutsDialog.css";

// Shortcut Data
const SHORTCUTS = [
  ["Space / K", "Play / Pause"],
  ["J", "Rewind 10 seconds"],
  ["L", "Forward 10 seconds"],
  ["M", "Mute"],
  ["← / →", "Seek backward / forward"],
  ["↑ / ↓", "Volume up / down"],
  ["F", "Full screen"],
  ["T", "Theater mode"],
  ["C", "Toggle captions"],
  ["Shift + N", "Next video"],
  ["Shift + P", "Previous video"],
  ["Home / End", "Beginning / End of video"],
];

// Component
export default function KeyboardShortcutsDialog({
  isOpen,
  onClose,
}) {

  // Render
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="yt-shortcuts-dialog"
    >
      <div className="yt-shortcuts-header">
        <h2>Keyboard shortcuts</h2>

        <button
          type="button"
          className="yt-shortcuts-close"
          onClick={onClose}
          aria-label="Close keyboard shortcuts"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="yt-shortcuts-list">
        {SHORTCUTS.map(([keys, action]) => (
          <div
            key={keys}
            className="yt-shortcuts-row"
          >
            <span className="yt-shortcuts-key">
              {keys}
            </span>

            <span className="yt-shortcuts-action">
              {action}
            </span>
          </div>
        ))}
      </div>
    </Dialog>
  );
}