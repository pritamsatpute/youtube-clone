// React
import { useState } from "react";

// Provider
import { useAuth } from "../../../providers/AuthProvider";

// Services
import { createChannel } from "../../../services/channelService";

// Components
import AvatarSelector from "./AvatarSelector";
import ChannelForm from "./ChannelForm";
import TermsNotice from "./TermsNotice";
import DialogFooter from "./DialogFooter";

// Styles
import "./CreateChannelDialog.css";

// Component
export default function CreateChannelDialog({
  isOpen,
  onClose,
}) {
  // Auth
  const {
    user,
    refreshUser,
  } = useAuth();

  // Default Name
  const defaultName =
    user?.name?.trim() || "";

  // Default Handle
  const defaultHandle =
    defaultName
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        "-",
      )
      .replace(
        /^-+|-+$/g,
        "");

  // State
  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      channelName:
        defaultName,

      handle:
        defaultHandle,

      description: "",

      avatar: null,
    });

  // Can Create
  const canCreate =
    Boolean(
      form.channelName.trim() &&
      form.handle.trim(),
    );

  // Create Channel
  const handleCreate =
    async () => {
      try {
        // Reset Error
        setError("");

        // Loading
        setLoading(true);

        // Create
        await createChannel(
          form,
        );

        // Refresh User
        await refreshUser();

        // Close
        onClose();
      } catch (error) {
        setError(
          error.message ||
            "Unable to create your channel.",
        );
      } finally {
        setLoading(false);
      }
    };

  // Hidden
  if (!isOpen) {
    return null;
  }

  // Render
  return (
    <div
      className="yt-create-channel-overlay"
      onClick={onClose}
    >
      <div
        className="yt-create-channel-dialog"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <h2 className="yt-dialog-title">
          How you'll appear
        </h2>

        <AvatarSelector
          avatar={form.avatar}
          setForm={setForm}
        />

        <ChannelForm
          form={form}
          setForm={setForm}
          error={error}
        />

        <TermsNotice />

        <DialogFooter
          loading={loading}
          canCreate={canCreate}
          onCancel={onClose}
          onCreate={handleCreate}
        />
      </div>
    </div>
  );
}