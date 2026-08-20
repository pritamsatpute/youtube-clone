// React
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Provider
import { useAuth } from "../../../providers/AuthProvider";

// Services
import {
  getSubscriptionStatus,
  subscribeToChannel,
  unsubscribeFromChannel,
  updateChannel,
} from "../../../services/channelService";

// Components
import CustomizeChannelModal from "../../../components/Channel/CustomizeChannelModal/CustomizeChannelModal";
import ManageVideosModal from "../../../components/Channel/ManageVideosModal/ManageVideosModal";
import EditVideoModal from "../../../components/Studio/EditVideoModal/EditVideoModal";

// Utils
import getMediaUrl from "../../../utils/getMediaUrl";

// Styles
import "./ChannelHeader.css";

// Component
export default function ChannelHeader({
  channel,
  isOwner = false,
  onChannelUpdated,
  onVideosChanged,
}) {
  // Navigation
  const navigate =
    useNavigate();

  // Auth
  const { user } =
    useAuth();

  // Profile Image Input
  const avatarInputRef =
    useRef(null);

  // Profile Upload
  const [
    avatarUploading,
    setAvatarUploading,
  ] = useState(false);

  // Subscription
  const [
    isSubscribed,
    setIsSubscribed,
  ] = useState(false);

  const [
    subscriptionLoading,
    setSubscriptionLoading,
  ] = useState(false);

  const [
    subscriptionError,
    setSubscriptionError,
  ] = useState("");

  // Description
  const [
    showFullDescription,
    setShowFullDescription,
  ] = useState(false);

  // Links
  const [
    showAllLinks,
    setShowAllLinks,
  ] = useState(false);

  // Subscriber Count
  const [
    subscriberCount,
    setSubscriberCount,
  ] = useState(0);

  // Customize Channel
  const [
    customizeOpen,
    setCustomizeOpen,
  ] = useState(false);

  // Manage Videos
  const [
    manageVideosOpen,
    setManageVideosOpen,
  ] = useState(false);

  // Edit Video
  const [
    editingVideo,
    setEditingVideo,
  ] = useState(null);

  // Initialize Subscriber Count
  useEffect(() => {
    if (!channel) {
      return;
    }

    const count =
      Number(
        String(
          channel.subscribers ||
            "0",
        )
          .replace(
            /subscribers?/gi,
            "",
          )
          .replace(
            /,/g,
            "",
          )
          .trim(),
      );

    setSubscriberCount(
      Number.isFinite(count)
        ? count
        : 0,
    );
  }, [channel]);

  // Load Subscription Status
  useEffect(() => {
    let mounted = true;

    const loadStatus =
      async () => {
        // Owner
        if (isOwner) {
          if (mounted) {
            setIsSubscribed(
              false,
            );
          }

          return;
        }

        // Guest
        if (!user) {
          if (mounted) {
            setIsSubscribed(
              false,
            );
          }

          return;
        }

        // Invalid Channel
        if (!channel?.id) {
          return;
        }

        try {
          const response =
            await getSubscriptionStatus(
              channel.id,
            );

          const data =
            response?.data;

          const subscribed =
            Boolean(
              data?.isSubscribed ??
                data?.subscribed ??
                false,
            );

          if (mounted) {
            setIsSubscribed(
              subscribed,
            );
          }
        } catch (error) {
          console.error(
            "Failed to load subscription status:",
            error,
          );
        }
      };

    loadStatus();

    return () => {
      mounted = false;
    };
  }, [
    channel?.id,
    user,
    isOwner,
  ]);

  // Format Subscriber Count
  const formattedSubscribers =
    useMemo(() => {
      const count =
        Number(
          subscriberCount,
        ) || 0;

      if (count >= 1000000) {
        return `${(
          count / 1000000
        ).toFixed(
          count >=
            10000000
            ? 0
            : 2,
        )}M subscribers`;
      }

      if (count >= 1000) {
        return `${(
          count / 1000
        ).toFixed(
          count >=
            100000
            ? 0
            : 1,
        )}K subscribers`;
      }

      return `${count.toLocaleString()} subscribers`;
    }, [
      subscriberCount,
    ]);

  // Links
  const links =
    Array.isArray(
      channel?.links,
    )
      ? channel.links.filter(
          (link) =>
            link?.url,
        )
      : [];

  // Visible Links
  const visibleLinks =
    showAllLinks
      ? links
      : links.slice(0, 1);

  // Remaining Links
  const remainingLinks =
    Math.max(
      links.length - 1,
      0,
    );

  // Description
  const description =
    channel?.description?.trim() ||
    "";

  // Open Profile Image Picker
  const handleProfilePictureUpdate =
    () => {
      if (
        avatarUploading
      ) {
        return;
      }

      avatarInputRef.current?.click();
    };

  // Profile Image Selected
  const handleAvatarChange =
    async (
      event,
    ) => {
      const file =
        event.target.files?.[0];

      // Reset Input
      event.target.value =
        "";

      if (!file) {
        return;
      }

      // Validate Image
      if (
        !file.type.startsWith(
          "image/",
        )
      ) {
        setSubscriptionError(
          "Please select a valid image.",
        );

        return;
      }

      // Validate Size
      if (
        file.size >
        5 *
          1024 *
          1024
      ) {
        setSubscriptionError(
          "Profile picture must be smaller than 5 MB.",
        );

        return;
      }

      try {
        setAvatarUploading(
          true,
        );

        setSubscriptionError(
          "",
        );

        // Form Data
        const formData =
          new FormData();

        formData.append(
          "avatar",
          file,
        );

        // Update Channel
        const response =
          await updateChannel(
            formData,
          );

        const updatedChannel =
          response?.data;

        // Update Parent
        if (
          updatedChannel
        ) {
          onChannelUpdated?.(
            updatedChannel,
          );
        }
      } catch (error) {
        console.error(
          "Failed to update profile picture:",
          error,
        );

        setSubscriptionError(
          error?.message ||
            "Failed to update profile picture.",
        );
      } finally {
        setAvatarUploading(
          false,
        );
      }
    };

  // Subscribe / Unsubscribe
  const handleSubscription =
    async () => {
      // Guest
      if (!user) {
        navigate(
          "/login",
        );

        return;
      }

      // Invalid Channel
      if (!channel?.id) {
        return;
      }

      // Loading
      if (
        subscriptionLoading
      ) {
        return;
      }

      try {
        setSubscriptionLoading(
          true,
        );

        setSubscriptionError(
          "",
        );

        // Unsubscribe
        if (
          isSubscribed
        ) {
          const response =
            await unsubscribeFromChannel(
              channel.id,
            );

          setIsSubscribed(
            false,
          );

          // Backend Count
          const backendCount =
            response?.data
              ?.subscribersCount ??
            response?.data
              ?.channel
              ?.subscribersCount;

          if (
            backendCount !==
            undefined
          ) {
            setSubscriberCount(
              Number(
                backendCount,
              ),
            );
          } else {
            setSubscriberCount(
              (previous) =>
                Math.max(
                  previous - 1,
                  0,
                ),
            );
          }

          return;
        }

        // Subscribe
        const response =
          await subscribeToChannel(
            channel.id,
          );

        setIsSubscribed(
          true,
        );

        // Backend Count
        const backendCount =
          response?.data
            ?.subscribersCount ??
          response?.data
            ?.channel
            ?.subscribersCount;

        if (
          backendCount !==
          undefined
        ) {
          setSubscriberCount(
            Number(
              backendCount,
            ),
          );
        } else {
          setSubscriberCount(
            (previous) =>
              previous + 1,
          );
        }
      } catch (error) {
        console.error(
          "Subscription action failed:",
          error,
        );

        // Already Subscribed
        if (
          error?.status ===
            409 ||
          error?.response
            ?.status ===
            409 ||
          error?.message ===
            "Already subscribed"
        ) {
          setIsSubscribed(
            true,
          );

          setSubscriptionError(
            "",
          );

          return;
        }

        setSubscriptionError(
          error?.message ||
            "Something went wrong.",
        );
      } finally {
        setSubscriptionLoading(
          false,
        );
      }
    };

  // Open Edit Video
  const handleEditVideo =
    (video) => {
      if (!video) {
        return;
      }

      setManageVideosOpen(
        false,
      );

      setEditingVideo(
        video,
      );
    };

  // Close Edit Video
  const handleEditVideoClose =
    () => {
      setEditingVideo(
        null,
      );
    };

  // Video Updated
  const handleVideoUpdated =
    (updatedVideo) => {
      if (!updatedVideo) {
        return;
      }

      setEditingVideo(
        null,
      );

      // Refresh Channel Videos
      onVideosChanged?.();
    };

  // Render
  return (
    <section className="yt-channel-header">
      {/* Avatar */}
      <div className="yt-channel-avatar-wrapper">
        <img
          src={getMediaUrl(
            channel.avatar,
          )}
          alt={
            channel.name
          }
          className="yt-channel-avatar"
        />

        {/* Profile Image Input */}
        {isOwner && (
          <input
            ref={
              avatarInputRef
            }
            type="file"
            accept="image/*"
            className="yt-channel-avatar-input"
            onChange={
              handleAvatarChange
            }
          />
        )}

        {/* Profile Edit */}
        {isOwner && (
          <button
            type="button"
            className="yt-channel-avatar-edit"
            aria-label="Update profile picture"
            onClick={
              handleProfilePictureUpdate
            }
            disabled={
              avatarUploading
            }
          >
            {avatarUploading
              ? "Uploading..."
              : "Edit"}
          </button>
        )}
      </div>

      {/* Information */}
      <div className="yt-channel-info">
        {/* Channel Name */}
        <h1 className="yt-channel-name">
          {channel.name}
        </h1>

        {/* Handle + Subscribers + Videos */}
        <div className="yt-channel-meta">
          <span>
            @{channel.handle}
          </span>

          <span>•</span>

          <span>
            {
              formattedSubscribers
            }
          </span>

          <span>•</span>

          <span>
            {Number(
              channel.videoCount ||
                0,
            ).toLocaleString()}{" "}
            videos
          </span>
        </div>

        {/* Description */}
        {description && (
          <div
            className={
              showFullDescription
                ? "yt-channel-description yt-channel-description-expanded"
                : "yt-channel-description"
            }
          >
            <span>
              {showFullDescription
                ? description
                : description.length >
                    120
                  ? `${description.slice(
                      0,
                      120,
                    )}...`
                  : description}
            </span>

            {description.length >
              120 && (
              <button
                type="button"
                className="yt-channel-more-text"
                onClick={() =>
                  setShowFullDescription(
                    (
                      previous,
                    ) =>
                      !previous,
                  )
                }
              >
                {showFullDescription
                  ? "less"
                  : "more"}
              </button>
            )}
          </div>
        )}

        {/* Links */}
        {links.length >
          0 && (
          <div className="yt-channel-links">
            <span className="yt-channel-links-icon">
              🔗
            </span>

            {visibleLinks.map(
              (
                link,
              ) => (
                <a
                  key={
                    link.url
                  }
                  href={
                    link.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yt-channel-link"
                >
                  {link.title ||
                    link.url}
                </a>
              ),
            )}

            {/* More Links */}
            {!showAllLinks &&
              remainingLinks >
                0 && (
                <button
                  type="button"
                  className="yt-channel-links-more"
                  onClick={() =>
                    setShowAllLinks(
                      true,
                    )
                  }
                >
                  and{" "}
                  {
                    remainingLinks
                  }{" "}
                  more links
                </button>
              )}

            {/* Less Links */}
            {showAllLinks &&
              links.length >
                1 && (
                <button
                  type="button"
                  className="yt-channel-links-more"
                  onClick={() =>
                    setShowAllLinks(
                      false,
                    )
                  }
                >
                  Show less
                </button>
              )}
          </div>
        )}

        {/* Actions */}
        <div className="yt-channel-actions">
          {isOwner ? (
            <>
              {/* Customize */}
              <button
                type="button"
                className="yt-channel-action secondary"
                onClick={() =>
                  setCustomizeOpen(
                    true,
                  )
                }
              >
                Customize
                channel
              </button>

              {/* Manage Videos */}
              <button
                type="button"
                className="yt-channel-action secondary"
                onClick={() =>
                  setManageVideosOpen(
                    true,
                  )
                }
              >
                Manage
                videos
              </button>
            </>
          ) : (
            <>
              {/* Subscribe */}
              <button
                type="button"
                className={`yt-channel-action ${
                  isSubscribed
                    ? "subscribed"
                    : "subscribe"
                }`}
                onClick={
                  handleSubscription
                }
                disabled={
                  subscriptionLoading
                }
              >
                {subscriptionLoading
                  ? "Loading..."
                  : isSubscribed
                    ? "Subscribed"
                    : "Subscribe"}
              </button>

              {/* Join */}
              <button
                type="button"
                className="yt-channel-action join"
              >
                Join
              </button>
            </>
          )}
        </div>

        {/* Error */}
        {subscriptionError && (
          <p className="yt-channel-action-error">
            {
              subscriptionError
            }
          </p>
        )}
      </div>

      {/* Customize Channel */}
      <CustomizeChannelModal
        open={
          customizeOpen
        }
        channel={
          channel
        }
        onClose={() =>
          setCustomizeOpen(
            false,
          )
        }
        onChannelUpdated={
          onChannelUpdated
        }
      />

      {/* Manage Videos Modal */}
      {isOwner && (
        <ManageVideosModal
          open={
            manageVideosOpen
          }
          onClose={() =>
            setManageVideosOpen(
              false,
            )
          }
          onEditVideo={
            handleEditVideo
          }
          onVideosChanged={
            onVideosChanged
          }
        />
      )}

      {/* Edit Video Modal */}
      {isOwner && (
        <EditVideoModal
          video={
            editingVideo
          }
          open={Boolean(
            editingVideo,
          )}
          onClose={
            handleEditVideoClose
          }
          onUpdated={
            handleVideoUpdated
          }
        />
      )}
    </section>
  );
}