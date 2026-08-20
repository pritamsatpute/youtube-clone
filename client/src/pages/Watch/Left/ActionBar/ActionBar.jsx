// React
import {
  useEffect,
  useState,
} from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Provider
import { useAuth } from "../../../../providers/AuthProvider";

// Services
import {
  getVideoLikeStatus,
  likeVideo,
  unlikeVideo,
  dislikeVideo,
  undislikeVideo,
} from "../../../../services/videoService";

// Icons
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

// Components
import WatchMoreMenu from "./WatchMoreMenu/WatchMoreMenu";

// Styles
import "./ActionBar.css";

// Component
export default function ActionBar({
  video,
}) {
  // Navigation
  const navigate = useNavigate();

  // Auth
  const { user } = useAuth();

  // Menu
  const [
    isMenuOpen,
    setIsMenuOpen,
  ] = useState(false);

  // Like
  const [
    isLiked,
    setIsLiked,
  ] = useState(false);

  // Dislike
  const [
    isDisliked,
    setIsDisliked,
  ] = useState(false);

  // Like Count
  const [
    likeCount,
    setLikeCount,
  ] = useState(
    Number(video?.likes) || 0,
  );

  // Dislike Count
  const [
    dislikeCount,
    setDislikeCount,
  ] = useState(
    Number(video?.dislikes) || 0,
  );

  // Reaction Loading
  const [
    reactionLoading,
    setReactionLoading,
  ] = useState(false);

  // Load Reaction Status
  useEffect(() => {
    let mounted = true;

    // Reset State
    setIsLiked(false);

    setIsDisliked(false);

    setLikeCount(
      Number(video?.likes) || 0,
    );

    setDislikeCount(
      Number(video?.dislikes) || 0,
    );

    setIsMenuOpen(false);

    // Guest
    if (!user?._id) {
      return () => {
        mounted = false;
      };
    }

    // Invalid Video
    if (!video?.id) {
      return () => {
        mounted = false;
      };
    }

    // Load Status
    const loadReactionStatus =
      async () => {
        try {
          const response =
            await getVideoLikeStatus(
              video.id,
            );

          if (!mounted) {
            return;
          }

          const data =
            response?.data;

          setIsLiked(
            Boolean(data?.liked),
          );

          setIsDisliked(
            Boolean(data?.disliked),
          );

          if (
            data?.likes !== undefined
          ) {
            setLikeCount(
              Number(data.likes),
            );
          }

          if (
            data?.dislikes !== undefined
          ) {
            setDislikeCount(
              Number(data.dislikes),
            );
          }
        } catch (error) {
          console.error(
            "Failed to load video reaction status:",
            error,
          );
        }
      };

    loadReactionStatus();

    return () => {
      mounted = false;
    };
  }, [
    video?.id,
    video?.likes,
    video?.dislikes,
    user?._id,
  ]);

  // Like / Unlike
  const handleLike = async () => {
    // Guest
    if (!user?._id) {
      navigate("/login");

      return;
    }

    // Invalid Video
    if (!video?.id) {
      return;
    }

    // Loading
    if (reactionLoading) {
      return;
    }

    // Previous State
    const previousLiked =
      isLiked;

    const previousDisliked =
      isDisliked;

    const previousLikeCount =
      likeCount;

    const previousDislikeCount =
      dislikeCount;

    try {
      setReactionLoading(true);

      // Unlike
      if (isLiked) {
        setIsLiked(false);

        setLikeCount(
          (previous) =>
            Math.max(
              previous - 1,
              0,
            ),
        );

        const response =
          await unlikeVideo(
            video.id,
          );

        const data =
          response?.data;

        if (
          data?.likes !== undefined
        ) {
          setLikeCount(
            Number(data.likes),
          );
        }

        if (
          data?.dislikes !== undefined
        ) {
          setDislikeCount(
            Number(data.dislikes),
          );
        }

        return;
      }

      // Like
      setIsLiked(true);

      setIsDisliked(false);

      setLikeCount(
        (previous) =>
          previous + 1,
      );

      if (isDisliked) {
        setDislikeCount(
          (previous) =>
            Math.max(
              previous - 1,
              0,
            ),
        );
      }

      const response =
        await likeVideo(
          video.id,
        );

      const data =
        response?.data;

      if (
        data?.likes !== undefined
      ) {
        setLikeCount(
          Number(data.likes),
        );
      }

      if (
        data?.dislikes !== undefined
      ) {
        setDislikeCount(
          Number(data.dislikes),
        );
      }
    } catch (error) {
      // Rollback
      setIsLiked(
        previousLiked,
      );

      setIsDisliked(
        previousDisliked,
      );

      setLikeCount(
        previousLikeCount,
      );

      setDislikeCount(
        previousDislikeCount,
      );

      console.error(
        "Video like action failed:",
        error,
      );
    } finally {
      setReactionLoading(false);
    }
  };

  // Dislike / Undislike
  const handleDislike = async () => {
    // Guest
    if (!user?._id) {
      navigate("/login");

      return;
    }

    // Invalid Video
    if (!video?.id) {
      return;
    }

    // Loading
    if (reactionLoading) {
      return;
    }

    // Previous State
    const previousLiked =
      isLiked;

    const previousDisliked =
      isDisliked;

    const previousLikeCount =
      likeCount;

    const previousDislikeCount =
      dislikeCount;

    try {
      setReactionLoading(true);

      // Undislike
      if (isDisliked) {
        setIsDisliked(false);

        setDislikeCount(
          (previous) =>
            Math.max(
              previous - 1,
              0,
            ),
        );

        const response =
          await undislikeVideo(
            video.id,
          );

        const data =
          response?.data;

        if (
          data?.likes !== undefined
        ) {
          setLikeCount(
            Number(data.likes),
          );
        }

        if (
          data?.dislikes !== undefined
        ) {
          setDislikeCount(
            Number(data.dislikes),
          );
        }

        return;
      }

      // Dislike
      setIsDisliked(true);

      setIsLiked(false);

      setDislikeCount(
        (previous) =>
          previous + 1,
      );

      if (isLiked) {
        setLikeCount(
          (previous) =>
            Math.max(
              previous - 1,
              0,
            ),
        );
      }

      const response =
        await dislikeVideo(
          video.id,
        );

      const data =
        response?.data;

      if (
        data?.likes !== undefined
      ) {
        setLikeCount(
          Number(data.likes),
        );
      }

      if (
        data?.dislikes !== undefined
      ) {
        setDislikeCount(
          Number(data.dislikes),
        );
      }
    } catch (error) {
      // Rollback
      setIsLiked(
        previousLiked,
      );

      setIsDisliked(
        previousDisliked,
      );

      setLikeCount(
        previousLikeCount,
      );

      setDislikeCount(
        previousDislikeCount,
      );

      console.error(
        "Video dislike action failed:",
        error,
      );
    } finally {
      setReactionLoading(false);
    }
  };

  // Share
  const handleShare = async () => {
    const shareUrl =
      window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: video?.title,
          url: shareUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(
        shareUrl,
      );
    } catch (error) {
      if (
        error?.name !==
        "AbortError"
      ) {
        console.error(
          "Failed to share video:",
          error,
        );
      }
    }
  };

  // Formatted Likes
  const formattedLikes =
    likeCount.toLocaleString();

  // Render
  return (
    <section className="yt-action-bar">

      {/* Like / Dislike */}
      <div className="yt-action-group">

        {/* Like */}
        <button
          type="button"
          className={`yt-action-button ${
            isLiked
              ? "yt-action-button--active"
              : ""
          }`}
          onClick={handleLike}
          disabled={reactionLoading}
          aria-label={
            isLiked
              ? "Unlike"
              : "Like"
          }
        >
          {isLiked ? (
            <ThumbUpIcon />
          ) : (
            <ThumbUpOffAltIcon />
          )}

          <span className="yt-action-button-text">
            {formattedLikes}
          </span>
        </button>

        {/* Divider */}
        <div className="yt-action-divider" />

        {/* Dislike */}
        <button
          type="button"
          className={`yt-action-button icon-only ${
            isDisliked
              ? "yt-action-button--active"
              : ""
          }`}
          onClick={handleDislike}
          disabled={reactionLoading}
          aria-label={
            isDisliked
              ? "Remove dislike"
              : "Dislike"
          }
        >
          {isDisliked ? (
            <ThumbDownIcon />
          ) : (
            <ThumbDownOffAltIcon />
          )}
        </button>

      </div>

      {/* Share */}
      <button
        type="button"
        className="yt-action-button"
        onClick={handleShare}
        aria-label="Share"
      >
        <ShareOutlinedIcon />

        <span className="yt-action-button-text">
          Share
        </span>
      </button>

      {/* More */}
      <div className="yt-action-menu-wrapper">

        <button
          type="button"
          className="yt-action-button icon-only"
          aria-label="More actions"
          onClick={() =>
            setIsMenuOpen(
              (previous) =>
                !previous,
            )
          }
        >
          <MoreHorizOutlinedIcon />
        </button>

        <WatchMoreMenu
          isOpen={isMenuOpen}
          onClose={() =>
            setIsMenuOpen(false)
          }
        />

      </div>

    </section>
  );
}