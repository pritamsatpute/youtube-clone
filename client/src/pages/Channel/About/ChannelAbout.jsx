// React Router
import { useOutletContext } from "react-router-dom";

// Utils
import formatRelativeDate from "../../../utils/formatRelativeDate";

// Styles
import "./ChannelAbout.css";

// Component
export default function ChannelAbout() {
  // Channel
  const { channel } = useOutletContext();

  // Guard
  if (!channel) {
    return null;
  }

  // Joined Date
  const joinedDate = channel.joined
    ? new Date(channel.joined).toLocaleDateString(
        undefined,
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      )
    : "-";

  // Views
  const totalViews = Number(
    channel.totalViews || 0,
  ).toLocaleString();

  // Render
  return (
    <section className="yt-channel-about">

      {/* Left */}
      <div className="yt-about-left">

        <h2 className="yt-about-heading">
          Description
        </h2>

        <p className="yt-about-description">
          {channel.description ||
            "No description available."}
        </p>

        {/* Links */}
        {channel.links?.length > 0 && (
          <div className="yt-about-links-section">

            <h3 className="yt-about-heading">
              Links
            </h3>

            <div className="yt-about-links">
              {channel.links.map(
                (link, index) => (
                  <a
                    key={
                      link.url ||
                      `${link.title}-${index}`
                    }
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="yt-about-link"
                  >
                    {link.title ||
                      link.url}
                  </a>
                ),
              )}
            </div>

          </div>
        )}

      </div>

      {/* Right */}
      <aside className="yt-about-right">

        <div className="yt-about-card">

          <h2 className="yt-about-card-title">
            Details
          </h2>

          {/* Joined */}
          <div className="yt-about-row">
            <span>Joined</span>

            <strong>
              {joinedDate}
            </strong>
          </div>

          {/* Views */}
          <div className="yt-about-row">
            <span>Views</span>

            <strong>
              {totalViews}
            </strong>
          </div>

          {/* Location */}
          {channel.country && (
            <div className="yt-about-row">
              <span>Location</span>

              <strong>
                {channel.country}
              </strong>
            </div>
          )}

          {/* Business Email */}
          {channel.email && (
            <div className="yt-about-row">
              <span>Email</span>

              <strong>
                {channel.email}
              </strong>
            </div>
          )}

        </div>

      </aside>

    </section>
  );
}