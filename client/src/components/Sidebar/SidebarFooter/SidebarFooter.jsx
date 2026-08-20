// Styles
import "./SidebarFooter.css";

// Footer Links
const PRIMARY_LINKS = [
  "About",
  "Press",
  "Copyright",
  "Contact us",
  "Creators",
  "Advertise",
  "Developers",
];

const SECONDARY_LINKS = [
  "Terms",
  "Privacy",
  "Policy & Safety",
  "How YouTube works",
  "Test new features",
];

// Component
export default function SidebarFooter() {

  // Render
  return (
    <footer className="yt-sidebar-footer">
      <div className="yt-sidebar-footer-links">
        {PRIMARY_LINKS.map((link) => (
          <button
            key={link}
            type="button"
            className="yt-sidebar-footer-link"
          >
            {link}
          </button>
        ))}
      </div>

      <div className="yt-sidebar-footer-links">
        {SECONDARY_LINKS.map((link) => (
          <button
            key={link}
            type="button"
            className="yt-sidebar-footer-link"
          >
            {link}
          </button>
        ))}
      </div>

      <p className="yt-sidebar-footer-copy">
        © 2026 YouTube Clone - Created by Pritam Satpute
      </p>
    </footer>
  );
}