// React
import { useEffect, useMemo, useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Provider
import { useAuth } from "../../providers/AuthProvider";

// Services
import {
  getHistory,
  removeHistoryItem,
  clearHistory,
  getHistoryStatus,
  updateHistoryStatus,
} from "../../services/historyService";

// Components
import HistoryHeader from "./HistoryHeader/HistoryHeader";
import HistorySearch from "./HistorySearch/HistorySearch";
import HistorySidebar from "./HistorySidebar/HistorySidebar";
import HistoryGroup from "./HistoryGroup/HistoryGroup";
import EmptyHistory from "./EmptyHistory/EmptyHistory";

// Skeleton
import SkeletonList from "../../components/Skeleton/SkeletonList/SkeletonList";

// Icons
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";

// Styles
import "./History.css";

// Component
export default function History() {
  // Auth
  const { user, loading: authLoading } = useAuth();

  // State
  const [history, setHistory] = useState([]);

  const [search, setSearch] = useState("");

  const [isPaused, setIsPaused] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Load History
  useEffect(() => {
    // Authentication Loading
    if (authLoading) {
      return;
    }

    // Guest
    if (!user) {
      setHistory([]);
      setLoading(false);
      return;
    }

    // Request
    const loadHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const [historyResponse, statusResponse] = await Promise.all([
          getHistory(),
          getHistoryStatus(),
        ]);

        // History
        setHistory(historyResponse.data || []);

        // History Status
        setIsPaused(Boolean(statusResponse.data?.isPaused));
      } catch (err) {
        setError(err.message || "Failed to load history.");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [user, authLoading]);

  // Filter History
  const filteredHistory = useMemo(() => {
    const query = search.trim().toLowerCase();

    // No Search
    if (!query) {
      return history;
    }

    // Search
    return history.filter((item) => {
      const video = item.video;

      const title = video?.title || "";

      const channel =
        video?.channel ||
        video?.channelName ||
        video?.channel?.channelName ||
        "";

      const handle = video?.channelHandle || video?.channel?.handle || "";

      return (
        title.toLowerCase().includes(query) ||
        channel.toLowerCase().includes(query) ||
        handle.toLowerCase().includes(query)
      );
    });
  }, [history, search]);

  // Group History
  const groupedHistory = useMemo(() => {
    const groups = {};

    filteredHistory.forEach((item) => {
      const watchedDate = new Date(item.watchedAt);

      // Today
      const today = new Date();

      // Yesterday
      const yesterday = new Date();

      yesterday.setDate(yesterday.getDate() - 1);

      // Label
      let label;

      if (watchedDate.toDateString() === today.toDateString()) {
        label = "Today";
      } else if (watchedDate.toDateString() === yesterday.toDateString()) {
        label = "Yesterday";
      } else {
        label = watchedDate.toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      }

      // Create Group
      if (!groups[label]) {
        groups[label] = [];
      }

      groups[label].push(item);
    });

    // Convert Object
    return Object.entries(groups).map(([date, videos]) => ({
      id: date,
      date,
      videos,
    }));
  }, [filteredHistory]);

  // Remove History Item
  const handleRemove = async (historyId) => {
    try {
      setError("");

      await removeHistoryItem(historyId);

      setHistory((previous) =>
        previous.filter((item) => item.id !== historyId),
      );
    } catch (err) {
      setError(err.message || "Failed to remove history item.");
    }
  };

  // Clear History
  const handleClear = async () => {
    const confirmed = window.confirm("Clear all watch history?");

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await clearHistory();

      setHistory([]);
    } catch (err) {
      setError(err.message || "Failed to clear history.");
    }
  };

  // Toggle History
  const handleTogglePause = async () => {
    try {
      setError("");

      const nextState = !isPaused;

      const response = await updateHistoryStatus(nextState);

      setIsPaused(Boolean(response.data?.isPaused ?? nextState));
    } catch (err) {
      setError(err.message || "Failed to update history settings.");
    }
  };

  // Manage History
  const handleManage = () => {
    // YouTube's history management
    // can be connected here later.
    console.log("Manage history");
  };

  // Authentication Loading
  if (authLoading) {
    return <main className="yt-history-page-state">Loading history...</main>;
  }

  // Guest
  if (!user) {
    return (
      <main className="yt-history-guest">
        {/* Guest Content */}
        <div className="yt-history-guest-content">
          {/* Icon */}
          <div className="yt-history-guest-icon">
            <HistoryOutlinedIcon />
          </div>

          {/* Title */}
          <h1>Keep track of what you watch</h1>

          {/* Description */}
          <p>Watch history isn't available when you're signed out.</p>

          {/* Sign In */}
          <Link to="/login" className="yt-history-guest-button">
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  // History Loading
  if (loading) {
    return (
      <div className="yt-history">
        {/* Main Content */}
        <main className="yt-history-content">
          {/* Header */}
          <HistoryHeader />

          {/* Search */}
          <HistorySearch value={search} onChange={setSearch} />

          {/* Skeleton */}
          <SkeletonList count={6} type="horizontal" />
        </main>

        {/* Sidebar */}
        <aside className="yt-history-sidebar-wrapper">
          <HistorySidebar
            historyPaused={false}
            onClear={handleClear}
            onTogglePause={handleTogglePause}
            onManage={handleManage}
          />
        </aside>
      </div>
    );
  }

  // Error
  if (error && !history.length) {
    return (
      <main className="yt-history-page-state yt-history-page-error">
        {error}
      </main>
    );
  }

  // Render
  return (
    <div className="yt-history">
      {/* Main Content */}
      <main className="yt-history-content">
        {/* Header */}
        <HistoryHeader />

        {/* Search */}
        <HistorySearch value={search} onChange={setSearch} />

        {/* Error */}
        {error && <div className="yt-history-inline-error">{error}</div>}

        {/* History Groups */}
        {groupedHistory.length === 0 ? (
          <EmptyHistory />
        ) : (
          groupedHistory.map((group) => (
            <HistoryGroup
              key={group.id}
              group={group}
              onRemove={handleRemove}
            />
          ))
        )}
      </main>

      {/* Sidebar */}
      <aside className="yt-history-sidebar-wrapper">
        <HistorySidebar
          historyPaused={isPaused}
          onClear={handleClear}
          onTogglePause={handleTogglePause}
          onManage={handleManage}
        />
      </aside>
    </div>
  );
}
