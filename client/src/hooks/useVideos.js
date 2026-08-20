// React
import { useEffect, useState } from "react";

// Services
import { getVideos } from "../services/videoService";

// Hook
export default function useVideos() {
  // State
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // Load Videos
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);

        const response = await getVideos();

        setVideos(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  return {
    videos,
    loading,
    error,
  };
}