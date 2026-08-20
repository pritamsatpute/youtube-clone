// React
import {
  useCallback,
  useEffect,
  useState,
} from "react";

// React Router
import { useParams } from "react-router-dom";

// Provider
import { useAuth } from "../../../../providers/AuthProvider";

// Services
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../../../../services/commentService";

// Components
import CommentsHeader from "./CommentHeader/CommentsHeader";
import CommentInput from "./CommentInput/CommentInput";
import CommentList from "./CommentList/CommentList";

// Styles
import "./Comments.css";

// Component
export default function Comments() {
  // Params
  const { id: videoId } = useParams();

  // Auth
  const { user } = useAuth();

  // State
  const [comments, setComments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // Load Comments
  const loadComments =
    useCallback(async () => {
      try {
        setLoading(true);

        setError("");

        const response =
          await getComments(videoId);

        setComments(response.data);
      } catch (err) {
        setError(
          err.message ||
            "Failed to load comments.",
        );
      } finally {
        setLoading(false);
      }
    }, [videoId]);

  // Initialize
  useEffect(() => {
    loadComments();
  }, [loadComments]);

  // Create
  const handleCreateComment =
    async (content) => {
      const response =
        await createComment({
          videoId,
          content,
        });

      setComments((previous) => [
        response.data,
        ...previous,
      ]);
    };

  // Update
  const handleUpdateComment =
    async (commentId, content) => {
      const response =
        await updateComment(
          commentId,
          {
            content,
          },
        );

      setComments((previous) =>
        previous.map((comment) =>
          comment.id === commentId
            ? response.data
            : comment,
        ),
      );
    };

  // Delete
  const handleDeleteComment =
    async (commentId) => {
      await deleteComment(commentId);

      setComments((previous) =>
        previous.filter(
          (comment) =>
            comment.id !== commentId,
        ),
      );
    };

  // Reply
  const handleReply = async (
    parentComment,
    content,
  ) => {
    const response =
      await createComment({
        videoId,
        content,
        parentComment,
      });

    setComments((previous) =>
      previous.map((comment) => {
        if (
          comment.id !== parentComment
        ) {
          return comment;
        }

        return {
          ...comment,
          replies: [
            ...(comment.replies ||
              []),
            response.data,
          ],
        };
      }),
    );
  };

  // Loading
  if (loading) {
    return (
      <section className="yt-comments">
        Loading comments...
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="yt-comments">
        {error}
      </section>
    );
  }

  // Render
  return (
    <section className="yt-comments">

      {/* Header */}
      <CommentsHeader
        count={comments.length}
      />

      {/* Input - Logged In Only */}
      {user && (
        <CommentInput
          onSubmit={
            handleCreateComment
          }
        />
      )}

      {/* List */}
      <div className="yt-comments-list">
        <CommentList
          comments={comments}
          actions={{
            updateComment:
              handleUpdateComment,
            deleteComment:
              handleDeleteComment,
            replyComment:
              handleReply,
          }}
        />
      </div>

    </section>
  );
}