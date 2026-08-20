// Styles
import "./ChannelForm.css";

// Component
export default function ChannelForm({ form, setForm, error }) {
  // Generate Handle
  const generateHandle = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");

  // Name Change
  const handleNameChange = (event) => {
    const value = event.target.value;

    setForm((previous) => ({
      ...previous,
      channelName: value,

      handle:
        previous.handle === "" ||
        previous.handle === generateHandle(previous.channelName)
          ? generateHandle(value)
          : previous.handle,
    }));
  };

  // Handle Change
  const handleHandleChange = (event) => {
    const value = event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");

    setForm((previous) => ({
      ...previous,
      handle: value,
    }));
  };

  // Render
  return (
    <section className="yt-channel-form">
      {/* Name */}
      <div className="yt-field">
        <label>Name</label>

        <input
          type="text"
          value={form.channelName}
          onChange={handleNameChange}
        />
      </div>

      {/* Handle */}
      <div className="yt-field">
        <label>Handle</label>

        <div className="yt-handle-input">
          <span className="yt-handle-prefix">@</span>

          <input
            type="text"
            value={form.handle}
            onChange={handleHandleChange}
          />
        </div>
      </div>

      <p className="yt-handle-url">youtube.com/@{form.handle}</p>
    </section>
  );
  {
    error && <p className="yt-form-error">{error}</p>;
  }
}
