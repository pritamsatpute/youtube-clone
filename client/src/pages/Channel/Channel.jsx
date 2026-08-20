// React
import { useEffect, useState } from "react";

// React Router
import { Outlet, useParams } from "react-router-dom";

// Provider
import { useAuth } from "../../providers/AuthProvider";

// Services
import { getChannelByHandle } from "../../services/channelService";

// Components
import ChannelBanner from "./Banner/ChannelBanner";
import ChannelHeader from "./Header/ChannelHeader";
import ChannelTabs from "./Navigation/ChannelTabs";

// Skeleton
import ChannelSkeleton from "../../components/Skeleton/ChannelSkeleton/ChannelSkeleton";

// Styles
import "./Channel.css";

// Component
export default function Channel() {
  // Route Params
  const { handle } = useParams();

  // Auth
  const { user } = useAuth();

  // State
  const [loading, setLoading] = useState(true);

  const [channel, setChannel] = useState(null);

  // Video Refresh
  const [videoRefreshKey, setVideoRefreshKey] = useState(0);

  // Refresh Videos
  const refreshVideos = () => {
    setVideoRefreshKey((previous) => previous + 1);
  };

  // Load Channel
  const loadChannel = async () => {
    try {
      setLoading(true);

      const response = await getChannelByHandle(handle);

      const apiChannel = response.data;

      setChannel({
        id: apiChannel._id,

        owner: apiChannel.owner,

        name: apiChannel.channelName,

        handle: apiChannel.handle,

        description: apiChannel.description,

        avatar: apiChannel.avatar,

        banner: apiChannel.banner,

        subscribers: `${apiChannel.subscribersCount ?? 0} subscribers`,

        videoCount: apiChannel.videosCount ?? 0,

        totalViews: apiChannel.totalViews ?? 0,

        website: apiChannel.website || "",

        email: apiChannel.businessEmail || "",

        country: apiChannel.country || "",

        joined: apiChannel.createdAt,

        links: apiChannel.links || [],
      });
    } catch (error) {
      console.error("Failed to load channel:", error);

      setChannel(null);
    } finally {
      setLoading(false);
    }
  };

  // Load Channel
  useEffect(() => {
    if (handle) {
      loadChannel();
    }
  }, [handle]);

  // Refresh Channel
  const refreshChannel = async () => {
    if (!handle) {
      return;
    }

    try {
      const response = await getChannelByHandle(handle);

      const apiChannel = response.data;

      setChannel({
        id: apiChannel._id,

        owner: apiChannel.owner,

        name: apiChannel.channelName,

        handle: apiChannel.handle,

        description: apiChannel.description,

        avatar: apiChannel.avatar,

        banner: apiChannel.banner,

        subscribers: `${apiChannel.subscribersCount ?? 0} subscribers`,

        videoCount: apiChannel.videosCount ?? 0,

        totalViews: apiChannel.totalViews ?? 0,

        website: apiChannel.website || "",

        email: apiChannel.businessEmail || "",

        country: apiChannel.country || "",

        joined: apiChannel.createdAt,

        links: apiChannel.links || [],
      });
    } catch (error) {
      console.error("Failed to refresh channel:", error);
    }
  };

  // Channel Updated
  const handleChannelUpdated = (updatedChannel) => {
    if (!updatedChannel) {
      return;
    }

    setChannel((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,

        id: updatedChannel._id || previous.id,

        owner: updatedChannel.owner || previous.owner,

        name: updatedChannel.channelName || previous.name,

        handle: updatedChannel.handle || previous.handle,

        description: updatedChannel.description ?? previous.description,

        avatar: updatedChannel.avatar || previous.avatar,

        banner: updatedChannel.banner || previous.banner,

        subscribers:
          updatedChannel.subscribersCount !== undefined
            ? `${updatedChannel.subscribersCount} subscribers`
            : previous.subscribers,

        videoCount: updatedChannel.videosCount ?? previous.videoCount,

        totalViews: updatedChannel.totalViews ?? previous.totalViews,

        website: updatedChannel.website ?? previous.website,

        email: updatedChannel.businessEmail ?? previous.email,

        country: updatedChannel.country ?? previous.country,

        joined: updatedChannel.createdAt || previous.joined,

        links: updatedChannel.links ?? previous.links,
      };
    });
  };

  // Loading
  if (loading) {
    return <ChannelSkeleton />;
  }

  // Not Found
  if (!channel) {
    return <div className="yt-channel-page-state">Channel not found.</div>;
  }

  // Owner
  const isOwner = user?._id === channel.owner || user?.channel === channel.id;

  // Render
  return (
    <div className="yt-channel-page">
      {/* Banner */}
      <ChannelBanner
        channel={channel}
        isOwner={isOwner}
        onChannelUpdated={handleChannelUpdated}
      />

      {/* Header */}
      <ChannelHeader
        channel={channel}
        isOwner={isOwner}
        onChannelUpdated={handleChannelUpdated}
        onVideosChanged={refreshChannel}
      />

      {/* Navigation */}
      <ChannelTabs />

      {/* Content */}
      <main className="yt-channel-content">
        <Outlet
          context={{
            channel,
            videoRefreshKey,
            refreshVideos,
          }}
        />
      </main>
    </div>
  );
}
