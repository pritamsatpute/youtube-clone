// React
import { useState } from "react";

// Styles
import "./ReplyInput.css";

// Component
export default function ReplyInput({
  onCancel,
  onSubmit,
}) {
  // State
  const [text, setText] =
    useState("");

  // Submit
  const handleSubmit = async () => {
    const value = text.trim();

    if (!value) return;

    await onSubmit?.(value);

    setText("");
  };

  // Cancel
  const handleCancel = () => {
    setText("");

    onCancel?.();
  };

  // Render
  return (
    <div className="yt-reply-input">

      {/* Textbox */}
      <input
        type="text"
        placeholder="Add a reply..."
        value={text}
        onChange={(event) =>
          setText(event.target.value)
        }
        className="yt-reply-textbox"
      />

      {/* Actions */}
      <div className="yt-reply-actions">

        <button
          type="button"
          className="yt-reply-cancel"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="button"
          className="yt-reply-submit"
          disabled={!text.trim()}
          onClick={handleSubmit}
        >
          Reply
        </button>

      </div>

    </div>
  );
}