import { MdFiberManualRecord, MdMoreVert } from "react-icons/md";

import "./NotificationCard.css";

export default function NotificationCard({ notification }) {

    return (

        <div className="notification-card">

            <div className="notification-left">

                <img
                    src={notification.avatar}
                    alt={notification.channel}
                    className="notification-avatar"
                />

                <div className="notification-content">

                    <p>

                        <strong>{notification.channel}</strong>{" "}

                        {notification.message}

                    </p>

                    <span>{notification.time}</span>

                </div>

            </div>

            <div className="notification-right">

                {

                    !notification.read && (

                        <MdFiberManualRecord
                            className="notification-unread"
                        />

                    )

                }

                <img
                    src={notification.thumbnail}
                    alt="thumbnail"
                    className="notification-thumbnail"
                />

                <button className="notification-menu">

                    <MdMoreVert />

                </button>

            </div>

        </div>

    );

}