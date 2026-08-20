// React
import { useMemo, useState } from "react";

// Styles
import "./Home.css";

// Components
import FilterBar from "./FilterBar/FilterBar";
import VideoGrid from "./VideoGrid/VideoGrid";
import SkeletonList from "../../components/Skeleton/SkeletonList/SkeletonList";

// Hooks
import useVideoList from "../../hooks/useVideoList";

// Services
import { getVideos } from "../../services/videoService";

// Component
export default function Home() {
  // State
  const [activeCategory, setActiveCategory] =
    useState("All");

  // Videos
  const {
    videos,
    loading,
    error,
  } = useVideoList(getVideos);

  // Filter Videos
  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") {
      return videos;
    }

    return videos.filter(
      (video) =>
        video.category?.toLowerCase() ===
        activeCategory.toLowerCase(),
    );
  }, [
    videos,
    activeCategory,
  ]);

  // Render
  return (
    <div className="home-page">

      {/* Filter Bar */}
      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={
          setActiveCategory
        }
      />

      {/* Content */}
      <section className="home-content">

        {/* Loading */}
        {loading && (
          <SkeletonList
            count={8}
            type="video"
          />
        )}

        {/* Error */}
        {error && (
          <div className="home-error">
            Failed to load videos.
          </div>
        )}

        {/* Videos */}
        {!loading && !error && (
          <VideoGrid
            videos={filteredVideos}
          />
        )}

      </section>

    </div>
  );
}