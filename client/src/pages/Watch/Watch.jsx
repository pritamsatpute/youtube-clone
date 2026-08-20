// React
import { useEffect, useState } from "react";

// React Router
import { useParams } from "react-router-dom";

// Services
import {
  getVideoById,
  getVideos,
  registerVideoView,
} from "../../services/videoService";

// Provider
import { useAuth } from "../../providers/AuthProvider";

// Components
import VideoPlayer from "./Left/VideoPlayer/VideoPlayer";
import VideoDetails from "./Left/VideoDetails/VideoDetails";
import ActionBar from "./Left/ActionBar/ActionBar";
import ChannelCard from "./Left/ChannelCard/ChannelCard";
import DescriptionBox from "./Left/Description/Description";
import Comments from "./Left/Comments/Comments";
import Recommendations from "./Right/Recommendations/Recommendations";

// Skeleton
import WatchSkeleton from "../../components/Skeleton/WatchSkeleton/WatchSkeleton";

// Styles
import "./Watch.css";

// Component
export default function Watch() {
  // Auth
  const { user } =
  useAuth();

  // Params
  const { id } = useParams();

  // State
  const [video, setVideo] = useState(null);

  const [recommendedVideos, setRecommendedVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Load Video
  useEffect(() => {
    // Load
    const loadVideo = async () => {
      try {
        setLoading(true);

        setError("");

        // Current Video
        const videoResponse = await getVideoById(id);

        const currentVideo = videoResponse.data;

        setVideo(currentVideo);

        // Register View
        if (user && String(currentVideo.ownerId) !== String(user._id)) {
          try {
            const viewResponse = await registerVideoView(id);

            if (viewResponse?.data?.views !== undefined) {
              setVideo((previous) => ({
                ...previous,
                views: viewResponse.data.views,
              }));
            }
          } catch (viewError) {
            console.error("Failed to register video view:", viewError);
          }
        }

        // Recommendations
        const videosResponse = await getVideos();

        const filtered = videosResponse.data.filter(
          (item) => String(item.id) !== String(id),
        );

        setRecommendedVideos(filtered);
      } catch (err) {
        setError(err.message || "Failed to load video.");
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id, user]);

  // Loading
  if (loading) {
    return <WatchSkeleton />;
  }

  // Error
  if (error) {
    return <div className="watch-not-found">{error}</div>;
  }

  // Not Found
  if (!video) {
    return <div className="watch-not-found">Video not found.</div>;
  }

  // Render
  return (
    <div className="watch-page">
      {/* Main Content */}
      <main className="watch-content">
        {/* Video Player */}
        <VideoPlayer video={video} />

        {/* Video Details */}
        <VideoDetails video={video} />

        {/* Channel + Actions */}
        <div className="watch-meta-row">
          <ChannelCard video={video} />

          <ActionBar video={video} />
        </div>

        {/* Description */}
        <DescriptionBox video={video} />

        {/* Comments */}
        <Comments />
      </main>

      {/* Recommendations */}
      <aside className="watch-secondary">
        <Recommendations videos={recommendedVideos} />
      </aside>
    </div>
  );
}
