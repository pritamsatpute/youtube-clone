// React
import {
  useEffect,
  useState,
} from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Provider
import { useAuth } from "../../../../../providers/AuthProvider";

// Utils
import formatRelativeDate from "../../../../../utils/formatRelativeDate";
import getMediaUrl from "../../../../../utils/getMediaUrl";

// Services
import {
  getCommentLikeStatus,
  likeComment,
  unlikeComment,
} from "../../../../../services/commentService";

// Icons
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

// Components
import ReplyInput from "../ReplyInput/ReplyInput";
import ReplyList from "../ReplyList/ReplyList";
import CommentMenu from "../../../../../components/CommentMenu/CommentMenu";

// Styles
import "./CommentItem.css";

// Component
export default function CommentItem({
  comment,
  actions,
}) {
  // Navigation
  const navigate = useNavigate();

  // Auth
  const { user } = useAuth();

  // Like
  const [liked, setLiked] =
    useState(false);

  // Like Count
  const [likeCount, setLikeCount] =
    useState(
      Number(comment?.likes) || 0,
    );

  // Like Loading
  const [
    likeLoading,
    setLikeLoading,
  ] = useState(false);

  // Reply
  const [
    showReplyInput,
    setShowReplyInput,
  ] = useState(false);

  // Replies
  const [
    showReplies,
    setShowReplies,
  ] = useState(false);

  // Menu
  const [
    isMenuOpen,
    setIsMenuOpen,
  ] = useState(false);

  // Editing
  const [
    isEditing,
    setIsEditing,
  ] = useState(false);

  // Text
  const [text, setText] =
    useState(
      comment.text,
    );

  // Ownership
  const isOwner =
    String(comment.userId) ===
    String(user?._id);

  // Avatar
  const avatar =
    comment.avatar ||
    (isOwner
      ? user?.channel?.avatar ||
        user?.avatar
      : "") ||
    "/images/default-avatar.png";

  // Handle
  const handle =
    comment.handle ||
    (isOwner
      ? user?.channel?.handle
      : "");

  // Load Like Status
  useEffect(() => {
    let mounted = true;

    // Update Count
    setLikeCount(
      Number(comment?.likes) || 0,
    );

    // Guest
    if (!user) {
      setLiked(false);

      return () => {
        mounted = false;
      };
    }

    // Invalid Comment
    if (!comment?.id) {
      return () => {
        mounted = false;
      };
    }

    // Load Status
    const loadLikeStatus =
      async () => {
        try {
          const response =
            await getCommentLikeStatus(
              comment.id,
            );

          const data =
            response?.data;

          if (!mounted) {
            return;
          }

          setLiked(
            Boolean(
              data?.liked,
            ),
          );

          if (
            data?.likes !==
            undefined
          ) {
            setLikeCount(
              Number(
                data.likes,
              ),
            );
          }
        } catch (error) {
          console.error(
            "Failed to load comment like status:",
            error,
          );
        }
      };

    loadLikeStatus();

    return () => {
      mounted = false;
    };
  }, [
    comment?.id,
    comment?.likes,
    user,
  ]);

  // Like / Unlike
  const handleLike = async () => {
    // Guest
    if (!user) {
      navigate("/login");

      return;
    }

    // Invalid Comment
    if (!comment?.id) {
      return;
    }

    // Loading
    if (likeLoading) {
      return;
    }

    try {
      setLikeLoading(true);

      // Unlike
      if (liked) {
        // Optimistic Update
        setLiked(false);

        setLikeCount(
          (previous) =>
            Math.max(
              previous - 1,
              0,
            ),
        );

        try {
          const response =
            await unlikeComment(
              comment.id,
            );

          const data =
            response?.data;

          if (
            data?.likes !==
            undefined
          ) {
            setLikeCount(
              Number(
                data.likes,
              ),
            );
          }
        } catch (error) {
          // Rollback
          setLiked(true);

          setLikeCount(
            (previous) =>
              previous + 1,
          );

          throw error;
        }

        return;
      }

      // Optimistic Update
      setLiked(true);

      setLikeCount(
        (previous) =>
          previous + 1,
      );

      try {
        const response =
          await likeComment(
            comment.id,
          );

        const data =
          response?.data;

        if (
          data?.likes !==
          undefined
        ) {
          setLikeCount(
            Number(
              data.likes,
            ),
          );
        }
      } catch (error) {
        // Rollback
        setLiked(false);

        setLikeCount(
          (previous) =>
            Math.max(
              previous - 1,
              0,
            ),
        );

        throw error;
      }
    } catch (error) {
      console.error(
        "Comment like action failed:",
        error,
      );
    } finally {
      setLikeLoading(false);
    }
  };

  // Menu Actions
  const handleMenuAction =
    async (action) => {
      setIsMenuOpen(false);

      switch (action) {
        case "edit":
          if (!isOwner) {
            return;
          }

          setIsEditing(true);
          break;

        case "delete":
          if (!isOwner) {
            return;
          }

          await actions?.deleteComment?.(
            comment.id,
          );
          break;

        case "report":
          console.log(
            "Report comment:",
            comment.id,
          );
          break;

        default:
          break;
      }
    };

  // Save Edit
  const handleSave = async () => {
    const value =
      text.trim();

    if (!value) {
      return;
    }

    await actions?.updateComment?.(
      comment.id,
      value,
    );

    setIsEditing(false);
  };

  // Cancel Edit
  const handleCancel = () => {
    setText(comment.text);

    setIsEditing(false);
  };

  // Render
  return (
    <article className="yt-comment-item">

      {/* Avatar */}
      <img
        src={getMediaUrl(avatar)}
        alt={
          handle
            ? `@${handle}`
            : "User"
        }
        className="yt-comment-item-avatar"
      />

      {/* Body */}
      <div className="yt-comment-item-body">

        {/* Header */}
        <div className="yt-comment-item-header">

          {/* Username */}
          <span className="yt-comment-item-handle">
            {handle
              ? `@${handle}`
              : user?.name}
          </span>

          {/* Time */}
          <span className="yt-comment-item-time">
            {formatRelativeDate(
              comment.createdAt,
            )}

            {comment.isEdited &&
              " • Edited"}
          </span>

        </div>

        {/* Edit / Text */}
        {isEditing ? (
          <>
            <textarea
              value={text}
              onChange={(
                event,
              ) =>
                setText(
                  event.target
                    .value,
                )
              }
              className="yt-comment-item-edit"
            />

            <div className="yt-comment-item-edit-actions">

              <button
                type="button"
                className="yt-comment-item-cancel"
                onClick={
                  handleCancel
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="yt-comment-item-submit"
                disabled={
                  !text.trim()
                }
                onClick={
                  handleSave
                }
              >
                Save
              </button>

            </div>
          </>
        ) : (
          <p className="yt-comment-item-text">
            {comment.text}
          </p>
        )}

        {/* Footer */}
        <div className="yt-comment-item-footer">

          {/* Like */}
          <button
            type="button"
            className={`yt-comment-item-action ${
              liked
                ? "yt-comment-item-action--liked"
                : ""
            }`}
            onClick={
              handleLike
            }
            disabled={
              likeLoading
            }
            aria-label={
              liked
                ? "Unlike comment"
                : "Like comment"
            }
          >
            {liked ? (
              <ThumbUpIcon />
            ) : (
              <ThumbUpOffAltOutlinedIcon />
            )}

            <span>
              {likeCount.toLocaleString()}
            </span>
          </button>

          {/* Dislike */}
          <button
            type="button"
            className="yt-comment-item-action"
            aria-label="Dislike comment"
          >
            <ThumbDownOffAltOutlinedIcon />
          </button>

          {/* Reply */}
          <button
            type="button"
            className="yt-comment-item-reply"
            onClick={() =>
              setShowReplyInput(
                (previous) =>
                  !previous,
              )
            }
          >
            Reply
          </button>

        </div>

        {/* Reply Input */}
        {showReplyInput && (
          <ReplyInput
            onCancel={() =>
              setShowReplyInput(
                false,
              )
            }
            onSubmit={async (
              replyText,
            ) => {
              await actions?.replyComment?.(
                comment.id,
                replyText,
              );

              setShowReplyInput(
                false,
              );
            }}
          />
        )}

        {/* Replies */}
        {comment.replies
          ?.length > 0 && (
          <>
            <button
              type="button"
              className="yt-comment-item-replies-toggle"
              onClick={() =>
                setShowReplies(
                  (previous) =>
                    !previous,
                )
              }
            >
              {showReplies ? (
                <KeyboardArrowUpOutlinedIcon />
              ) : (
                <KeyboardArrowDownOutlinedIcon />
              )}

              <span>
                {showReplies
                  ? "Hide replies"
                  : `View ${
                      comment
                        .replies
                        .length
                    } ${
                      comment
                        .replies
                        .length ===
                      1
                        ? "reply"
                        : "replies"
                    }`}
              </span>
            </button>

            {showReplies && (
              <ReplyList
                replies={
                  comment.replies
                }
              />
            )}
          </>
        )}

      </div>

      {/* Menu */}
      <div className="yt-comment-item-menu-wrapper">

        <button
          type="button"
          className="yt-comment-item-menu"
          aria-label="Comment options"
          onClick={() =>
            setIsMenuOpen(
              (previous) =>
                !previous,
            )
          }
        >
          <MoreVertOutlinedIcon />
        </button>

        <CommentMenu
          isOpen={isMenuOpen}
          onClose={() =>
            setIsMenuOpen(false)
          }
          onAction={
            handleMenuAction
          }
          isOwner={isOwner}
        />

      </div>

    </article>
  );
}