// React Router
import { NavLink } from "react-router-dom";

// Styles
import "./ChannelTabs.css";

// Channel Tabs
const tabs = [
  {
    label: "Home",
    path: "",
    end: true,
  },
  {
    label: "Videos",
    path: "videos",
  },
  {
    label: "Playlists",
    path: "playlists",
  },
];

// Component
export default function ChannelTabs() {
  // Render
  return (
    <nav
      className="yt-channel-tabs"
      aria-label="Channel navigation"
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.label}
          to={tab.path}
          end={tab.end}
          className={({ isActive }) =>
            `yt-channel-tab ${
              isActive ? "active" : ""
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}