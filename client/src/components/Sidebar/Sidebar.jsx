// React
import { useEffect, useState } from "react";

// Services
import { getMyChannel } from "../../services/channelService";

// Styles
import "./Sidebar.css";

// Components
import SidebarFooter from "./SidebarFooter/SidebarFooter";
import SidebarSection from "./SidebarSection";
import SidebarSignInCard from "./SidebarSignInCard/SidebarSignInCard";
import SidebarSubscriptions from "./SidebarSubscriptions/SidebarSubscriptions";

// Data
import {
  guestPrimaryItems,
  miniSidebarItems,
  moreFromYoutubeItems,
  exploreItems,
  primaryItems,
  settingsItems,
  youItems,
} from "./sidebarData";

// Component
export default function Sidebar({ isOpen, user = null }) {
  // My Channel
  const [myChannel, setMyChannel] = useState(null);

  // Load My Channel
  useEffect(() => {
    if (!user) {
      setMyChannel(null);
      return;
    }

    const loadMyChannel = async () => {
      try {
        const response = await getMyChannel();

        setMyChannel(response?.data || null);
      } catch (error) {
        console.error("Failed to load my channel:", error);

        setMyChannel(null);
      }
    };

    loadMyChannel();
  }, [user]);

  const loggedInYouItems = youItems.map((item) => {
    if (item.title !== "Your Channel") {
      return item;
    }

    return {
      ...item,
      path: myChannel?.handle ? `/channel/${myChannel.handle}` : item.path,
    };
  });

  // Collapsed
  if (!isOpen) {
    return (
      <aside className="yt-sidebar collapsed">
        <SidebarSection items={miniSidebarItems} collapsed />
      </aside>
    );
  }

  // Guest
  if (!user) {
    return (
      <aside className="yt-sidebar expanded">
        <SidebarSection items={guestPrimaryItems} />

        <hr />

        <SidebarSignInCard />

        <hr />

        <SidebarSection
          title="Explore"
          items={exploreItems}
          expandable
          initialVisibleItems={3}
        />

        <hr />

        <SidebarSection
          title="More from YouTube"
          items={moreFromYoutubeItems}
        />

        <hr />

        <SidebarSection items={settingsItems} />

        <SidebarFooter />
      </aside>
    );
  }

  // Logged In
  return (
    <aside className="yt-sidebar expanded">
      <SidebarSection items={primaryItems} />

      <hr />

      <SidebarSection title="You" showArrow items={loggedInYouItems} />

      <hr />

      <SidebarSubscriptions user={user} />

      <hr />

      <SidebarSection
        title="Explore"
        items={exploreItems}
        expandable
        initialVisibleItems={3}
      />

      <hr />

      <SidebarSection title="More from YouTube" items={moreFromYoutubeItems} />

      <hr />

      <SidebarSection items={settingsItems} />

      <SidebarFooter />
    </aside>
  );
}
