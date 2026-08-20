// React
import { useState } from "react";

// Provider
import { useAuth } from "../../../../../providers/AuthProvider";

// Utils
import getMediaUrl from "../../../../../utils/getMediaUrl";

// Styles
import "./CommentInput.css";

// Component
export default function CommentInput({ onSubmit }) {
  // Auth
  const { user } = useAuth();

  // Avatar
  const avatar =
    user?.channel?.avatar || user?.avatar || "/images/default-avatar.png";

  // State
  const [text, setText] = useState("");

  const [focused, setFocused] = useState(false);

  // Cancel
  const handleCancel = () => {
    setText("");
    setFocused(false);
  };

  // Submit
  const handleSubmit = async () => {
    const value = text.trim();

    if (!value) return;

    await onSubmit?.(value);

    setText("");
    setFocused(false);
  };

  // Render
  return (
    <div className="yt-comment-input">
      {/* Avatar */}
      <img
        src={getMediaUrl(avatar)}
        alt={user?.name || "User"}
        className="yt-comment-input-avatar"
      />

      {/* Form */}
      <div className="yt-comment-input-form">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onFocus={() => setFocused(true)}
          onChange={(event) => setText(event.target.value)}
          className="yt-comment-input-textbox"
        />

        {focused && (
          <div className="yt-comment-input-actions">
            {/* Cancel */}
            <button
              type="button"
              className="yt-comment-input-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>

            {/* Comment */}
            <button
              type="button"
              className="yt-comment-input-submit"
              disabled={!text.trim()}
              onClick={handleSubmit}
            >
              Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
