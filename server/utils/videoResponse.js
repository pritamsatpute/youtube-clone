// Build Video Response
export const buildVideoResponse = (
  video,
) => ({
  // Identity
  id: video._id,

  // Owner
  ownerId: video.owner?._id || video.owner,

  // Video
  title: video.title,
  description: video.description,

  thumbnail: video.thumbnail,
  videoUrl: video.videoUrl,

  duration: video.duration,

  visibility: video.visibility,

  category: video.category,

  tags: video.tags,

  // Channel
  channel: video.channel?.channelName,
  channelHandle: video.channel?.handle,
  avatar: video.channel?.avatar,

  subscribers:
    video.channel?.subscribersCount ?? 0,

  // Statistics
  views: video.views,
  likes: video.likes,
  dislikes: video.dislikes,

  comments: video.commentsCount,

  // Dates
  uploadedAt: video.createdAt,
});