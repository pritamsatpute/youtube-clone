// React
import { useRef } from "react";

// Utils
import getMediaUrl from "../../../utils/getMediaUrl";

// Services
import { updateChannel } from "../../../services/channelService";

// Icons
import { MdPhotoCamera } from "react-icons/md";

// Styles
import "./ChannelBanner.css";

// Component
export default function ChannelBanner({
  channel,
  isOwner = false,
  onChannelUpdated,
}) {
  // Banner Input
  const bannerInputRef =
    useRef(null);

  // Change Banner
  const handleBannerChange =
    async (event) => {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      try {
        const formData =
          new FormData();

        formData.append(
          "banner",
          file,
        );

        const response =
          await updateChannel(
            formData,
          );

        const updatedChannel =
          response.data;

        onChannelUpdated?.(
          updatedChannel,
        );
      } catch (error) {
        console.error(
          "Failed to update channel banner:",
          error,
        );
      } finally {
        event.target.value = "";
      }
    };

  // Render
  return (
    <section className="yt-channel-banner">

      {/* Banner */}
      {channel.banner ? (
        <img
          src={getMediaUrl(
            channel.banner,
          )}
          alt={`${channel.name} banner`}
          className="yt-channel-banner-image"
        />
      ) : (
        <div className="yt-channel-banner-placeholder">
          <span>{channel.name}</span>
        </div>
      )}

      {/* Owner Edit */}
      {isOwner && (
        <>
          <button
            type="button"
            className="yt-channel-banner-edit"
            onClick={() =>
              bannerInputRef.current?.click()
            }
          >
            <MdPhotoCamera />

            <span>Edit</span>
          </button>

          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={
              handleBannerChange
            }
          />
        </>
      )}

    </section>
  );
}