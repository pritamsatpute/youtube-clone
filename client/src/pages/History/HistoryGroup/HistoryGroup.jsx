// Components
import HorizontalVideoCard from "../../../components/HorizontalVideoCard/HorizontalVideoCard";

// Styles
import "./HistoryGroup.css";

// History Group
export default function HistoryGroup({
  group,
  onRemove,
}) {
  // Empty Group
  if (!group?.videos?.length) {
    return null;
  }

  // Render
  return (
    <section className="yt-history-group">

      {/* Date */}
      <div className="yt-history-group-date">
        <h2 className="yt-history-group-title">
          {group.date}
        </h2>
      </div>

      {/* Videos */}
      <div className="yt-history-group-videos">

        {group.videos.map((item) => (
          <HorizontalVideoCard
            key={item.id}
            video={item.video}
            historyId={item.id}
            onRemove={onRemove}
          />
        ))}

      </div>

    </section>
  );
}