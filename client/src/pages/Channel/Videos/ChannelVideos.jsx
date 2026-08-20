// React
import { useEffect, useState } from "react";

// React Router
import { useOutletContext } from "react-router-dom";

// Provider
import { useAuth } from "../../../providers/AuthProvider";

// Services
import {
  getMyVideos,
  getVideosByChannel,
} from "../../../services/videoService";

// Components
import VideoCard from "../../Home/VideoCard/VideoCard";

// Styles
import "./ChannelVideos.css";

// Component
export default function ChannelVideos({ videos: providedVideos }) {
  // Channel
  const { channel, videoRefreshKey } = useOutletContext();

  // Auth
  const { user } = useAuth();

  // State
  const [videos, setVideos] = useState(providedVideos || []);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Owner
  const isOwner = Boolean(
    user?._id && channel?.owner && String(user._id) === String(channel.owner),
  );

  // Load Videos
  useEffect(() => {
    // Use provided videos
    if (providedVideos) {
      setVideos(providedVideos);
      setLoading(false);
      setError("");

      return;
    }

    if (!channel?.handle) {
      return;
    }

    const loadVideos = async () => {
      try {
        setLoading(true);

        setError("");

        // Owner Videos
        const response = isOwner
          ? await getMyVideos()
          : await getVideosByChannel(channel.handle);

        setVideos(response.data || []);
      } catch (err) {
        console.error("Failed to load channel videos:", err);

        setError(err.message || "Failed to load channel videos.");
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [channel?.handle, isOwner, providedVideos, videoRefreshKey]);

  // Loading
  if (loading) {
    return <div className="yt-channel-videos-state">Loading videos...</div>;
  }

  // Error
  if (error && !videos.length) {
    return (
      <div className="yt-channel-videos-state yt-channel-videos-error">
        {error}
      </div>
    );
  }

  // Empty
  if (!videos.length) {
    return (
      <>
        <section className="yt-channel-videos-empty">
          <h3>No videos yet</h3>

          <p>This channel hasn't uploaded any videos.</p>
        </section>
      </>
    );
  }

  // Render
  return (
    <>
      {error && (
        <div className="yt-channel-videos-state yt-channel-videos-error">
          {error}
        </div>
      )}

      <section className="yt-channel-videos">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            isOwner={false}
          />
        ))}
      </section>
    </>
  );
}
