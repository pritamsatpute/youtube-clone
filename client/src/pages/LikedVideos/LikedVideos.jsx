// React
import { useEffect, useState } from "react";

// Provider
import { useAuth } from "../../providers/AuthProvider";

// Components
import HorizontalVideoCard from "../../components/HorizontalVideoCard/HorizontalVideoCard";
import LikedVideosHeader from "./LikedVideosHeader/LikedVideosHeader";
import LikedVideosToolbar from "./LikedVideosToolbar/LikedVideosToolbar";
import LikedVideosSidebar from "./LikedVideosSidebar/LikedVideosSidebar";
import EmptyLikedVideos from "./EmptyLikedVideos/EmptyLikedVideos";

// Skeleton
import SkeletonList from "../../components/Skeleton/SkeletonList/SkeletonList";

// Services
import { getMyLikedVideos } from "../../services/videoService";

// Styles
import "./LikedVideos.css";

// Component
export default function LikedVideos() {
  // Auth
  const { user } = useAuth();

  // State
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // Fetch Liked Videos
  useEffect(() => {
    let mounted = true;

    const loadLikedVideos = async () => {
      // Guest
      if (!user) {
        if (mounted) {
          setVideos([]);
          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await getMyLikedVideos();

        const data =
          response?.data?.data ??
          response?.data ??
          [];

        if (mounted) {
          setVideos(
            Array.isArray(data)
              ? data
              : [],
          );
        }
      } catch (error) {
        console.error(
          "Failed to load liked videos:",
          error,
        );

        if (mounted) {
          setError(
            error?.message ||
              "Failed to load liked videos.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadLikedVideos();

    return () => {
      mounted = false;
    };
  }, [user]);

  // Render
  return (
    <div className="liked-videos-page">

      {/* Main */}
      <main className="liked-videos-main">

        {/* Header */}
        <LikedVideosHeader />

        {/* Toolbar */}
        <LikedVideosToolbar />

        {/* Loading */}
        {loading && (
          <SkeletonList
            count={6}
            type="horizontal"
          />
        )}

        {/* Error */}
        {!loading && error && (
          <div className="liked-videos-status liked-videos-error">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          videos.length === 0 && (
            <EmptyLikedVideos />
          )}

        {/* Videos */}
        {!loading &&
          !error &&
          videos.length > 0 && (
            <section className="liked-videos-list">

              {videos.map((video) => (
                <HorizontalVideoCard
                  key={video.id}
                  video={video}
                />
              ))}

            </section>
          )}

      </main>

      {/* Sidebar */}
      <aside className="liked-videos-sidebar-wrapper">
        <LikedVideosSidebar
          count={videos.length}
        />
      </aside>

    </div>
  );
}