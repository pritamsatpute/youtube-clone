// React Router
import { NavLink } from "react-router-dom";

// Component
export default function SidebarItem({
  item,
  collapsed = false,
}) {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `yt-sidebar-item ${
          isActive ? "active" : ""
        }`
      }
      title={collapsed ? item.title : undefined}
    >
      {({ isActive }) => (
        <>
          {/* Icon */}
          <span className="yt-sidebar-icon">
            {isActive && item.activeIcon
              ? item.activeIcon
              : item.icon}
          </span>

          {/* Label */}
          <span className="yt-sidebar-title">
            {item.title}
          </span>
        </>
      )}
    </NavLink>
  );
}