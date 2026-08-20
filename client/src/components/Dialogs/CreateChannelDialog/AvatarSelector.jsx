import { useRef } from "react";

import { useAuth } from "../../../providers/AuthProvider";

import getMediaUrl from "../../../utils/getMediaUrl";

import "./AvatarSelector.css";

export default function AvatarSelector({ avatar, setForm }) {
  const { user } = useAuth();

  const inputRef = useRef(null);

  const preview = avatar
    ? URL.createObjectURL(avatar)
    : getMediaUrl(user?.avatar);

  const openPicker = () => {
    inputRef.current?.click();
  };

  const handleChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    setForm((previous) => ({
      ...previous,
      avatar: file,
    }));
  };

  return (
    <section className="yt-dialog-avatar-selector">
      <div className="yt-dialog-avatar-wrapper">
        <img src={preview} alt="Avatar" className="yt-dialog-avatar-image" />
      </div>

      <button
        type="button"
        className="yt-dialog-avatar-button"
        onClick={openPicker}
      >
        Select picture
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />
    </section>
  );
}
