// Build Comment Response
export const buildCommentResponse = (
  comment,
  replies = [],
) => {
  // Owner
  const owner = comment.owner;

  // Channel
  const channel = owner?.channel;

  // Avatar
  const avatar =
    channel?.avatar ||
    owner?.avatar ||
    "/images/default-avatar.png";

  // Handle
  const handle =
    channel?.handle || "";

  return {
    // Identity
    id: comment._id,

    // User
    userId: owner?._id,

    // Author
    author: owner?.name || "User",

    // Username
    username:
      owner?.username ||
      "",

    // Handle
    handle,

    // Avatar
    avatar,

    // Content
    text: comment.content,

    // Statistics
    likes: comment.likes,

    // Status
    isEdited: comment.isEdited,

    // Dates
    createdAt: comment.createdAt,

    // Parent
    parentComment:
      comment.parentComment,

    // Replies
    replies,
  };
};