// React
import { useEffect, useState } from "react";

// React Router
import { useOutletContext } from "react-router-dom";

// Services
import { getVideosByChannel } from "../../../services/videoService";

// Components
import FeaturedVideo from "../Featured/FeaturedVideo";
import VideoCard from "../../Home/VideoCard/VideoCard";

// Styles
import "./ChannelHome.css";

// Component
export default function ChannelHome() {
  // Channel
  const { channel, videoRefreshKey } = useOutletContext();

  // State
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Load Channel Videos
  useEffect(() => {
    if (!channel?.handle) {
      return;
    }

    const loadVideos = async () => {
      try {
        setLoading(true);

        setError("");

        const response = await getVideosByChannel(channel.handle);

        setVideos(response.data || []);
      } catch (err) {
        console.error("Failed to load channel videos:", err);

        setError(err.message || "Failed to load channel videos.");
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [channel?.handle, videoRefreshKey]);

  // Featured Video
  const featuredVideo = videos.length > 0 ? videos[0] : null;

  // Latest Uploads
  const latestVideos = videos.length > 1 ? videos.slice(1) : [];

  // No Channel
  if (!channel) {
    return null;
  }

  // Render
  return (
    <div className="yt-channel-home">
      {/* Loading */}
      {loading && (
        <div className="yt-channel-home-state">Loading videos...</div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="yt-channel-home-state yt-channel-home-error">
          {error}
        </div>
      )}

      {/* Featured Video */}
      {!loading && !error && featuredVideo && (
        <FeaturedVideo channel={channel} video={featuredVideo} />
      )}

      {/* Uploads */}
      {!loading && !error && latestVideos.length > 0 && (
        <section className="yt-channel-section">
          <h2 className="yt-channel-section-title">Uploads</h2>

          <div className="yt-channel-home-videos">
            {latestVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      )}

      {/* Empty */}
      {!loading && !error && videos.length === 0 && (
        <section className="yt-channel-home-empty">
          <h2>No videos yet</h2>

          <p>This channel hasn't uploaded any videos.</p>
        </section>
      )}
    </div>
  );
}
