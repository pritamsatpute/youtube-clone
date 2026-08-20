// React
import {
  useCallback,
  useEffect,
  useState,
} from "react";

// Hook
export default function useVideoList(
  loader
) {
  const [videos, setVideos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const load =
    useCallback(async () => {
      try {
        setLoading(true);

        setError(null);

        const response =
          await loader();

        setVideos(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, [loader]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    videos,
    loading,
    error,
    refresh: load,
  };
}