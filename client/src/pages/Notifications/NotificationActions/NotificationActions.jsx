import { MdDoneAll } from "react-icons/md";

import "./NotificationActions.css";

export default function NotificationActions() {

    return (

        <div className="notification-actions">

            <button>

                <MdDoneAll />

                Mark all as read

            </button>

        </div>

    );

}