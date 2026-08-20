import Layout from "../../components/Layout/Layout";

import NotificationHeader from "./Components/NotificationHeader";
import NotificationActions from "./Components/NotificationActions";
import NotificationList from "./Components/NotificationList";
import EmptyNotifications from "./Components/EmptyNotifications";

import { notifications } from "./data/notifications";

import "./Notifications.css";

export default function Notifications() {

    return (

        <Layout>

            <div className="notifications-page">

                <NotificationHeader />

                <NotificationActions />

                {

                    notifications.length === 0 ?

                    <EmptyNotifications />

                    :

                    <NotificationList
                        notifications={notifications}
                    />

                }

            </div>

        </Layout>

    );

}