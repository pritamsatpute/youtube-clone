// Components
import CommentItem from "../CommentItem/CommentItem";

// Styles
import "./CommentList.css";

// Component
export default function CommentList({
  comments = [],
  actions,
}) {
  // Empty State
  if (!comments.length) {
    return (
      <div className="yt-comments-empty">
        No comments yet.
      </div>
    );
  }

  // Render
  return (
    <div className="yt-comment-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          actions={actions}
        />
      ))}
    </div>
  );
}