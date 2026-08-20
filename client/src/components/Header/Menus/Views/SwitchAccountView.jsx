// React
import {
  useEffect,
  useState,
} from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

// Provider
import { useAuth } from "../../../../providers/AuthProvider";

// Utils
import getMediaUrl from "../../../../utils/getMediaUrl";

// Styles
import "./SwitchAccountView.css";

// Component
export default function SwitchAccountView({
  onBack,
}) {
  // Navigation
  const navigate = useNavigate();

  // Auth
  const {
    user,
    getSavedAccounts,
    switchAccount,
  } = useAuth();

  // State
  const [accounts, setAccounts] =
    useState([]);

  const [switching, setSwitching] =
    useState(false);

  // Load Accounts
  useEffect(() => {
    setAccounts(
      getSavedAccounts(),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Switch Account
  const handleSwitch = async (
    account,
  ) => {
    if (
      switching ||
      String(
        account.user?._id,
      ) === String(user?._id)
    ) {
      return;
    }

    try {
      setSwitching(true);

      await switchAccount(account);

      onBack?.();
    } catch (error) {
      console.error(error);
    } finally {
      setSwitching(false);
    }
  };

  // Add Account
  const handleAddAccount = () => {
    navigate(
      "/login?addAccount=true",
    );
  };

  // Render
  return (
    <div className="yt-switch-account">
      {/* Header */}
      <div className="yt-switch-header">
        <button
          type="button"
          className="yt-switch-back"
          aria-label="Back"
          onClick={onBack}
        >
          <ArrowBackOutlinedIcon />
        </button>

        <h3>
          Switch account
        </h3>
      </div>

      {/* Accounts */}
      <div className="yt-switch-list">
        {accounts.map(
          (account) => {
            const accountUser =
              account.user;

            // Avatar
            const avatar =
              accountUser?.channel
                ?.avatar ||
              accountUser?.avatar ||
              "/images/default-avatar.png";

            // Name
            const name =
              accountUser?.channel
                ?.channelName ||
              accountUser?.name ||
              "User";

            // Username
            const username =
              accountUser?.username;

            // Email
            const email =
              accountUser?.email;

            // Current Account
            const isCurrent =
              String(
                accountUser?._id,
              ) ===
              String(user?._id);

            return (
              <button
                type="button"
                key={
                  accountUser?._id
                }
                className={`yt-switch-account-item ${
                  isCurrent
                    ? "active"
                    : ""
                }`}
                disabled={
                  switching ||
                  isCurrent
                }
                onClick={() =>
                  handleSwitch(
                    account,
                  )
                }
              >
                {/* Avatar */}
                <img
                  src={getMediaUrl(
                    avatar,
                  )}
                  alt={name}
                  className="yt-switch-avatar"
                />

                {/* Info */}
                <div className="yt-switch-info">
                  <strong>
                    {name}
                  </strong>

                  <span>
                    {email}
                  </span>
                </div>

                {/* Current */}
                {isCurrent && (
                  <CheckOutlinedIcon
                    className="yt-switch-check"
                  />
                )}
              </button>
            );
          },
        )}

        {/* Add Account */}
        <button
          type="button"
          className="yt-add-account"
          onClick={
            handleAddAccount
          }
        >
          <span className="yt-add-account-icon">
            <AddOutlinedIcon />
          </span>

          <span>
            Add account
          </span>
        </button>
      </div>
    </div>
  );
}