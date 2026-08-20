// React
import {
  useEffect,
  useRef,
  useState,
} from "react";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

// Services
import { updateChannel } from "../../../services/channelService";

// Utils
import getMediaUrl from "../../../utils/getMediaUrl";

// Styles
import "./CustomizeChannelModal.css";

// Component
export default function CustomizeChannelModal({
  open,
  channel,
  onClose,
  onChannelUpdated,
}) {
  // Refs
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  // State
  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] = useState({
    channelName: "",
    handle: "",
    description: "",
    website: "",
    businessEmail: "",
    country: "",
  });

  const [avatar, setAvatar] =
    useState(null);

  const [banner, setBanner] =
    useState(null);

  const [avatarPreview, setAvatarPreview] =
    useState("");

  const [bannerPreview, setBannerPreview] =
    useState("");

  // Initialize Form
  useEffect(() => {
    if (!open || !channel) {
      return;
    }

    setForm({
      channelName:
        channel.name || "",
      handle:
        channel.handle || "",
      description:
        channel.description || "",
      website:
        channel.website || "",
      businessEmail:
        channel.email || "",
      country:
        channel.country || "",
    });

    setAvatar(null);
    setBanner(null);

    setAvatarPreview(
      channel.avatar
        ? getMediaUrl(channel.avatar)
        : "",
    );

    setBannerPreview(
      channel.banner
        ? getMediaUrl(channel.banner)
        : "",
    );

    setError("");
  }, [open, channel]);

  // Escape
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (!saving) {
          onClose?.();
        }
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, saving, onClose]);

  // Update Field
  const updateField = (
    field,
    value,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  // Avatar
  const handleAvatarChange = (
    event,
  ) => {
    const file =
      event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/",
      )
    ) {
      setError(
        "Please select a valid profile picture.",
      );

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        "Profile picture must be smaller than 5 MB.",
      );

      return;
    }

    setAvatar(file);

    setAvatarPreview(
      URL.createObjectURL(file),
    );

    setError("");
  };

  // Banner
  const handleBannerChange = (
    event,
  ) => {
    const file =
      event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/",
      )
    ) {
      setError(
        "Please select a valid banner image.",
      );

      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setError(
        "Banner must be smaller than 10 MB.",
      );

      return;
    }

    setBanner(file);

    setBannerPreview(
      URL.createObjectURL(file),
    );

    setError("");
  };

  // Save
  const handleSave = async () => {
    if (saving) {
      return;
    }

    if (!form.channelName.trim()) {
      setError(
        "Channel name is required.",
      );

      return;
    }

    if (!form.handle.trim()) {
      setError(
        "Handle is required.",
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      const data =
        new FormData();

      data.append(
        "channelName",
        form.channelName.trim(),
      );

      data.append(
        "handle",
        form.handle
          .trim()
          .replace(/^@/, ""),
      );

      data.append(
        "description",
        form.description.trim(),
      );

      data.append(
        "website",
        form.website.trim(),
      );

      data.append(
        "businessEmail",
        form.businessEmail.trim(),
      );

      data.append(
        "country",
        form.country.trim(),
      );

      if (avatar) {
        data.append(
          "avatar",
          avatar,
        );
      }

      if (banner) {
        data.append(
          "banner",
          banner,
        );
      }

      const response =
        await updateChannel(data);

      const updatedChannel =
        response?.data;

      if (!updatedChannel) {
        throw new Error(
          "Channel update failed.",
        );
      }

      onChannelUpdated?.(
        updatedChannel,
      );

      onClose?.();
    } catch (err) {
      console.error(
        "Failed to update channel:",
        err,
      );

      setError(
        err?.message ||
          "Failed to update channel.",
      );
    } finally {
      setSaving(false);
    }
  };

  // Not Open
  if (!open || !channel) {
    return null;
  }

  // Render
  return (
    <div
      className="yt-customize-channel-overlay"
      onClick={() => {
        if (!saving) {
          onClose?.();
        }
      }}
    >
      <div
        className="yt-customize-channel-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* Header */}
        <header className="yt-customize-channel-header">

          <h2>
            Customize channel
          </h2>

          <button
            type="button"
            className="yt-customize-channel-close"
            onClick={onClose}
            disabled={saving}
            aria-label="Close"
          >
            <CloseIcon />
          </button>

        </header>

        {/* Content */}
        <div className="yt-customize-channel-content">

          {/* Branding */}
          <section className="yt-customize-section">

            <div className="yt-customize-section-header">

              <h3>
                Branding
              </h3>

              <p>
                Update your profile picture
                and channel banner.
              </p>

            </div>

            {/* Banner */}
            <div className="yt-customize-banner">

              {bannerPreview ? (
                <img
                  src={bannerPreview}
                  alt="Channel banner"
                />
              ) : (
                <div className="yt-customize-banner-empty">
                  <ImageOutlinedIcon />

                  <span>
                    Add channel banner
                  </span>
                </div>
              )}

              <button
                type="button"
                className="yt-customize-image-button"
                onClick={() =>
                  bannerInputRef.current?.click()
                }
              >
                Change banner
              </button>

              <input
                ref={bannerInputRef}
                hidden
                type="file"
                accept="image/*"
                onChange={
                  handleBannerChange
                }
              />

            </div>

            {/* Avatar */}
            <div className="yt-customize-avatar-row">

              <div className="yt-customize-avatar">

                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt={
                      form.channelName
                    }
                  />
                ) : (
                  <span>
                    {form.channelName
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}

              </div>

              <div className="yt-customize-avatar-info">

                <h4>
                  Profile picture
                </h4>

                <p>
                  Use a square image
                  that represents your
                  channel.
                </p>

                <button
                  type="button"
                  className="yt-customize-secondary-button"
                  onClick={() =>
                    avatarInputRef.current?.click()
                  }
                >
                  Change picture
                </button>

                <input
                  ref={avatarInputRef}
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={
                    handleAvatarChange
                  }
                />

              </div>

            </div>

          </section>

          {/* Basic Information */}
          <section className="yt-customize-section">

            <div className="yt-customize-section-header">

              <h3>
                Basic information
              </h3>

              <p>
                Update your channel
                information.
              </p>

            </div>

            {/* Channel Name */}
            <div className="yt-customize-field">

              <label>
                Channel name
              </label>

              <input
                type="text"
                maxLength={100}
                value={
                  form.channelName
                }
                onChange={(event) =>
                  updateField(
                    "channelName",
                    event.target.value,
                  )
                }
              />

            </div>

            {/* Handle */}
            <div className="yt-customize-field">

              <label>
                Handle
              </label>

              <div className="yt-customize-handle">

                <span>@</span>

                <input
                  type="text"
                  maxLength={30}
                  value={form.handle}
                  onChange={(event) =>
                    updateField(
                      "handle",
                      event.target.value,
                    )
                  }
                />

              </div>

            </div>

            {/* Description */}
            <div className="yt-customize-field">

              <label>
                Description
              </label>

              <textarea
                rows={5}
                maxLength={1000}
                value={
                  form.description
                }
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
              />

              <span>
                {form.description.length}/1000
              </span>

            </div>

          </section>

          {/* Contact Information */}
          <section className="yt-customize-section">

            <div className="yt-customize-section-header">

              <h3>
                Contact information
              </h3>

              <p>
                Add public contact
                information.
              </p>

            </div>

            {/* Website */}
            <div className="yt-customize-field">

              <label>
                Website
              </label>

              <input
                type="url"
                placeholder="https://example.com"
                value={
                  form.website
                }
                onChange={(event) =>
                  updateField(
                    "website",
                    event.target.value,
                  )
                }
              />

            </div>

            {/* Business Email */}
            <div className="yt-customize-field">

              <label>
                Business email
              </label>

              <input
                type="email"
                value={
                  form.businessEmail
                }
                onChange={(event) =>
                  updateField(
                    "businessEmail",
                    event.target.value,
                  )
                }
              />

            </div>

            {/* Country */}
            <div className="yt-customize-field">

              <label>
                Country
              </label>

              <input
                type="text"
                value={
                  form.country
                }
                onChange={(event) =>
                  updateField(
                    "country",
                    event.target.value,
                  )
                }
              />

            </div>

          </section>

          {/* Error */}
          {error && (
            <div className="yt-customize-error">
              {error}
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="yt-customize-channel-footer">

          <button
            type="button"
            className="yt-customize-cancel"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="button"
            className="yt-customize-save"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save"}
          </button>

        </footer>

      </div>
    </div>
  );
}