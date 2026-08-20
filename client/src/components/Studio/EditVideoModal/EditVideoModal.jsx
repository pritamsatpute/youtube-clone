// React
import { useEffect, useState } from "react";

// Services
import { updateVideo } from "../../../services/videoService";

// Components
import ThumbnailPicker from "../UploadModal/ThumbnailPicker/ThumbnailPicker";

// Utils
import getMediaUrl from "../../../utils/getMediaUrl";

// Hooks
import useLockBodyScroll from "../../../hooks/useLockBodyScroll";

// Styles
import "./EditVideoModal.css";

// Component
export default function EditVideoModal({ video, open, onClose, onUpdated }) {
  // State
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: null,
    category: "Entertainment",
    tags: "",
    audience: "not_for_kids",
    visibility: "private",
  });

  // Lock Page Scroll
  useLockBodyScroll(open);

  // Load Video
  useEffect(() => {
    if (!video || !open) {
      return;
    }

    setForm({
      title: video.title || "",
      description: video.description || "",
      thumbnail: null,
      category: video.category || "Entertainment",
      tags: Array.isArray(video.tags) ? video.tags.join(", ") : "",
      audience: video.audience || "not_for_kids",
      visibility: video.visibility || "private",
    });
  }, [video, open]);

  // Update Field
  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Close
  const handleClose = () => {
    if (isSaving) {
      return;
    }

    onClose?.();
  };

  // Save
  const handleSave = async () => {
    if (!video?.id) {
      return;
    }

    if (!form.title.trim()) {
      alert("Title is required.");

      return;
    }

    try {
      setIsSaving(true);

      const updates = {
        title: form.title.trim(),

        description: form.description.trim(),

        category: form.category.trim(),

        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        audience: form.audience,

        visibility: form.visibility,
      };

      // Thumbnail
      if (form.thumbnail) {
        updates.thumbnail = form.thumbnail;
      }

      const response = await updateVideo(video.id, updates);

      const updatedVideo = response.data;

      onUpdated?.(updatedVideo);

      onClose?.();
    } catch (error) {
      console.error("Failed to update video:", error);

      alert(error.message || "Failed to update video.");
    } finally {
      setIsSaving(false);
    }
  };

  // Not Open
  if (!open || !video) {
    return null;
  }

  // Render
  return (
    <div className="yt-edit-video-overlay" onClick={handleClose}>
      <div
        className="yt-edit-video-modal"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <header className="yt-edit-video-header">
          <h2>Edit video</h2>

          <button
            type="button"
            className="yt-edit-video-close"
            onClick={handleClose}
            disabled={isSaving}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        {/* Content */}
        <div className="yt-edit-video-content">
          {/* Current Thumbnail */}
          <section className="yt-edit-video-thumbnail">
            <img src={getMediaUrl(video.thumbnail)} alt={video.title} />
          </section>

          {/* Form */}
          <div className="yt-edit-video-form">
            {/* Title */}
            <div className="yt-edit-input-group">
              <label>Title</label>

              <textarea
                rows={3}
                maxLength={150}
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
              />

              <span>{form.title.length}/150</span>
            </div>

            {/* Description */}
            <div className="yt-edit-input-group">
              <label>Description</label>

              <textarea
                rows={7}
                maxLength={5000}
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
              />

              <span>{form.description.length}/5000</span>
            </div>

            {/* Tags */}
            <div className="yt-edit-input-group">
              <label>Tags</label>

              <textarea
                rows={2}
                value={form.tags}
                onChange={(event) => updateField("tags", event.target.value)}
              />

              <span>Separate tags with commas</span>
            </div>

            {/* Category */}
            <section className="yt-edit-card">
              <h3>Category</h3>

              <select
                value={form.category}
                onChange={(event) =>
                  updateField("category", event.target.value)
                }
              >
                <option value="Entertainment">Entertainment</option>

                <option value="Education">Education</option>

                <option value="Gaming">Gaming</option>

                <option value="Music">Music</option>

                <option value="Sports">Sports</option>

                <option value="Science & Technology">
                  Science & Technology
                </option>

                <option value="Travel & Events">Travel & Events</option>

                <option value="People & Blogs">People & Blogs</option>

                <option value="News & Politics">News & Politics</option>
              </select>
            </section>

            {/* Audience */}
            <section className="yt-edit-card">
              <h3>Audience</h3>

              <label>
                <input
                  type="radio"
                  checked={form.audience === "made_for_kids"}
                  onChange={() => updateField("audience", "made_for_kids")}
                />
                Yes, it's made for kids
              </label>

              <label>
                <input
                  type="radio"
                  checked={form.audience === "not_for_kids"}
                  onChange={() => updateField("audience", "not_for_kids")}
                />
                No, it's not made for kids
              </label>
            </section>

            {/* Visibility */}
            <section className="yt-edit-card">
              <h3>Visibility</h3>

              <select
                value={form.visibility}
                onChange={(event) =>
                  updateField("visibility", event.target.value)
                }
              >
                <option value="private">Private</option>

                <option value="unlisted">Unlisted</option>

                <option value="public">Public</option>
              </select>
            </section>

            {/* Thumbnail */}
            <ThumbnailPicker
              file={form.thumbnail}
              onChange={(image) => updateField("thumbnail", image)}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="yt-edit-video-footer">
          <button
            type="button"
            className="yt-edit-video-cancel"
            onClick={handleClose}
            disabled={isSaving}
          >
            Cancel
          </button>

          <button
            type="button"
            className="yt-edit-video-save"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </footer>
      </div>
    </div>
  );
}