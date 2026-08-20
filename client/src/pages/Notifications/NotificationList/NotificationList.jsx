import NotificationCard from "../NotificationCard/NotificationCard";

import "./NotificationList.css";

export default function NotificationList({ notifications }) {

    return (

        <div className="notification-list">

            {

                notifications.map((notification)=>(

                    <NotificationCard
                        key={notification.id}
                        notification={notification}
                    />

                ))

            }

        </div>

    );

}