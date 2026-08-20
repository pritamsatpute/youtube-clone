// Utils
import formatRelativeDate from "../../../../../utils/formatRelativeDate";
import getMediaUrl from "../../../../../utils/getMediaUrl";

// Styles
import "./ReplyList.css";

// Component
export default function ReplyList({ replies = [] }) {
  // Nothing to render
  if (!replies.length) {
    return null;
  }

  // Render
  return (
    <div className="yt-reply-list">
      {replies.map((reply) => (
        <article key={reply.id} className="yt-reply-item">
          {/* Avatar */}
          <img
            src={getMediaUrl(reply.avatar)}
            alt={reply.author}
            className="yt-reply-avatar"
          />

          {/* Body */}
          <div className="yt-reply-body">
            {/* Header */}
            <div className="yt-reply-header">
              <span className="yt-reply-author">
                {reply.handle ? `@${reply.handle}` : "@user"}
              </span>

              <span className="yt-reply-time">
                {formatRelativeDate(reply.createdAt)}

                {reply.isEdited && " • Edited"}
              </span>
            </div>

            {/* Text */}
            <p className="yt-reply-text">{reply.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
