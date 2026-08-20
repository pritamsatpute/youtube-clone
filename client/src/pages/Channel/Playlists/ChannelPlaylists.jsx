// React Router
import { Link } from "react-router-dom";

// Styles
import "./ChannelPlaylists.css";

// Component
export default function ChannelPlaylists({
  playlists = [],
}) {

  if (!playlists.length) {
    return (
      <section className="yt-channel-playlists-empty">

        <h2>No playlists</h2>

        <p>
          This channel hasn't created any public playlists.
        </p>

      </section>
    );
  }

  return (
    <section className="yt-channel-playlists">

      {playlists.map((playlist) => (

        <article
          key={playlist.id}
          className="yt-playlist-card"
        >

          <Link
            to={`/playlist/${playlist.id}`}
            className="yt-playlist-thumbnail-link"
          >
            <img
              src={playlist.thumbnail}
              alt={playlist.title}
              className="yt-playlist-thumbnail"
            />

            <span className="yt-playlist-count">
              {playlist.videoCount} videos
            </span>

          </Link>

          <div className="yt-playlist-content">

            <Link
              to={`/playlist/${playlist.id}`}
              className="yt-playlist-title"
            >
              {playlist.title}
            </Link>

            <p className="yt-playlist-meta">
              Updated {playlist.updated}
            </p>

            <Link
              to={`/playlist/${playlist.id}`}
              className="yt-playlist-link"
            >
              View full playlist
            </Link>

          </div>

        </article>

      ))}

    </section>
  );
}