// React
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// Components
import SearchCard from "../SearchCard/SearchCard";
import SkeletonList from "../../../components/Skeleton/SkeletonList/SkeletonList";

// Hooks
import useVideoList from "../../../hooks/useVideoList";

// Services
import { getVideos } from "../../../services/videoService";

// Styles
import "./SearchResults.css";

// Component
export default function SearchResults() {
  // Search Params
  const [searchParams] = useSearchParams();

  const query = (
    searchParams.get("search_query") || ""
  ).trim();

  // Videos
  const {
    videos,
    loading,
    error,
  } = useVideoList(getVideos);

  // Filter Videos
  const filteredVideos = useMemo(() => {
    if (!query) {
      return videos;
    }

    const search = query.toLowerCase();

    return videos.filter((video) =>
      video.title?.toLowerCase().includes(search)
    );
  }, [
    videos,
    query,
  ]);

  // Loading
  if (loading) {
    return (
      <SkeletonList
        count={8}
        type="video"
      />
    );
  }

  // Error
  if (error) {
    return (
      <div className="yt-search-empty">
        <h2>
          Something went wrong
        </h2>

        <p>
          Failed to load videos.
          Please try again.
        </p>
      </div>
    );
  }

  // Empty State
  if (!filteredVideos.length) {
    return (
      <div className="yt-search-empty">
        <h2>
          No results found
        </h2>

        <p>
          Try different keywords or
          check your spelling.
        </p>
      </div>
    );
  }

  // Render
  return (
    <section className="yt-search-results">
      {filteredVideos.map((video) => (
        <SearchCard
          key={video.id}
          video={video}
        />
      ))}
    </section>
  );
}