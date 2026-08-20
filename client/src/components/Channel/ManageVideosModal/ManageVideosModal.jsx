// React
import { useEffect, useMemo, useState } from "react";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Services
import { deleteVideo, getMyVideos } from "../../../services/videoService";

// Utils
import getMediaUrl from "../../../utils/getMediaUrl";
import formatViews from "../../../utils/formatViews";
import formatRelativeDate from "../../../utils/formatRelativeDate";

// Hooks
import useLockBodyScroll from "../../../hooks/useLockBodyScroll";

// Styles
import "./ManageVideosModal.css";

// Component
export default function ManageVideosModal({
  open,
  onClose,
  onEditVideo,
  onVideosChanged,
}) {
  // State
  const [menuVideoId, setMenuVideoId] = useState(null);

  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  // Lock Page Scroll
  useLockBodyScroll(open);

  // Delete
  const [deletingVideo, setDeletingVideo] = useState(null);

  const [deletingVideoId, setDeletingVideoId] = useState(null);

  // Load Videos
  useEffect(() => {
    if (!open) {
      return;
    }

    const loadVideos = async () => {
      try {
        setLoading(true);

        setError("");

        const response = await getMyVideos();

        setVideos(response?.data || []);
      } catch (err) {
        console.error("Failed to load videos:", err);

        setError(err?.message || "Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [open]);

  // Reset Menu
  useEffect(() => {
    if (!open) {
      setMenuVideoId(null);
    }
  }, [open]);

  // Escape
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !deletingVideo) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, deletingVideo, onClose]);

  // Filtered Videos
  const filteredVideos = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return videos;
    }

    return videos.filter((video) => video.title?.toLowerCase().includes(query));
  }, [videos, search]);

  // Edit
  const handleEdit = (video) => {
    if (!video) {
      return;
    }

    // Close Menu
    setMenuVideoId(null);

    // Close Manage Videos
    onClose?.();

    // Open Edit Video
    onEditVideo?.(video);
  };

  // Ask Delete
  const handleDeleteRequest = (video) => {
    if (!video) {
      return;
    }

    setMenuVideoId(null);

    setDeletingVideo(video);
  };

  // Cancel Delete
  const handleDeleteCancel = () => {
    if (deletingVideoId) {
      return;
    }

    setDeletingVideo(null);
  };

  // Confirm Delete
  const handleDeleteConfirm = async () => {
    if (!deletingVideo?.id || deletingVideoId) {
      return;
    }

    try {
      setDeletingVideoId(deletingVideo.id);

      setError("");

      await deleteVideo(deletingVideo.id);

      setVideos((previous) =>
        previous.filter(
          (video) => String(video.id) !== String(deletingVideo.id),
        ),
      );

      onVideosChanged?.();

      setDeletingVideo(null);
    } catch (err) {
      console.error("Failed to delete video:", err);

      setError(err?.message || "Failed to delete video.");
    } finally {
      setDeletingVideoId(null);
    }
  };

  // Not Open
  if (!open) {
    return null;
  }

  // Render
  return (
    <>
      {/* Manage Videos */}
      <div
        className="yt-manage-videos-overlay"
        onClick={() => {
          if (!deletingVideo) {
            onClose?.();
          }
        }}
      >
        <div
          className="yt-manage-videos-modal"
          onClick={(event) => event.stopPropagation()}
        >
          {/* Header */}
          <header className="yt-manage-videos-header">
            <div>
              <h2>Manage videos</h2>

              <p>Manage your uploaded videos.</p>
            </div>

            <button
              type="button"
              className="yt-manage-videos-close"
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </header>

          {/* Search */}
          <div className="yt-manage-videos-toolbar">
            <div className="yt-manage-videos-search">
              <SearchIcon />

              <input
                type="search"
                placeholder="Search videos"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <span className="yt-manage-videos-count">
              {filteredVideos.length} videos
            </span>
          </div>

          {/* Content */}
          <div className="yt-manage-videos-content">
            {/* Loading */}
            {loading && (
              <div className="yt-manage-videos-state">Loading videos...</div>
            )}

            {/* Error */}
            {!loading && error && !videos.length && (
              <div className="yt-manage-videos-state yt-manage-videos-error">
                {error}
              </div>
            )}

            {/* Empty */}
            {!loading && !error && !videos.length && (
              <div className="yt-manage-videos-state">
                <h3>No videos yet</h3>

                <p>Upload a video to manage it here.</p>
              </div>
            )}

            {/* Search Empty */}
            {!loading &&
              !error &&
              videos.length > 0 &&
              !filteredVideos.length && (
                <div className="yt-manage-videos-state">
                  <h3>No videos found</h3>

                  <p>Try a different search.</p>
                </div>
              )}

            {/* Videos */}
            {!loading && filteredVideos.length > 0 && (
              <div className="yt-manage-video-list">
                {filteredVideos.map((video) => (
                  <article key={video.id} className="yt-manage-video-row">
                    {/* Thumbnail */}
                    <div className="yt-manage-video-thumbnail">
                      <img
                        src={getMediaUrl(video.thumbnail)}
                        alt={video.title}
                      />

                      {video.duration > 0 && (
                        <span>
                          {Math.floor(video.duration / 60)}:
                          {String(Math.floor(video.duration % 60)).padStart(
                            2,
                            "0",
                          )}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="yt-manage-video-info">
                      <h3>{video.title}</h3>

                      <p>
                        {formatViews(video.views)}
                        {" • "}
                        {formatRelativeDate(video.uploadedAt)}
                      </p>
                    </div>

                    {/* Visibility */}
                    <div className="yt-manage-video-visibility">
                      <span>Visibility</span>

                      <strong>{video.visibility || "Private"}</strong>
                    </div>

                    {/* Actions */}
                    <div className="yt-manage-video-actions">
                      <button type="button" onClick={() => handleEdit(video)}>
                        Edit
                      </button>

                      <div className="yt-manage-video-menu-wrapper">
                        <button
                          type="button"
                          className="yt-manage-video-more"
                          aria-label={`More options for ${video.title}`}
                          aria-haspopup="menu"
                          aria-expanded={menuVideoId === video.id}
                          onClick={() =>
                            setMenuVideoId(
                              menuVideoId === video.id ? null : video.id,
                            )
                          }
                        >
                          <MoreVertIcon />
                        </button>

                        {menuVideoId === video.id && (
                          <div className="yt-manage-video-menu" role="menu">
                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => handleEdit(video)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              role="menuitem"
                              className="danger"
                              onClick={() => handleDeleteRequest(video)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {deletingVideo && (
        <div className="yt-delete-video-overlay">
          <div className="yt-delete-video-modal">
            <h2>Delete video?</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>"{deletingVideo.title}"</strong>? This action cannot be
              undone.
            </p>

            <div className="yt-delete-video-actions">
              <button
                type="button"
                onClick={handleDeleteCancel}
                disabled={Boolean(deletingVideoId)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="danger"
                onClick={handleDeleteConfirm}
                disabled={Boolean(deletingVideoId)}
              >
                {deletingVideoId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
