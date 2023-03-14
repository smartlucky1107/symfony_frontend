import React from "react";
import "./notifications.scss";

export const SmallNotifications = (props) => {

    return (
        <div className={'smallNotifications'}>
            <button className={'notificationsBtn'}>
                <span className="material-icons">
                    notifications
                </span>
                <div className={'notificationsNo'}>
                    <span>2</span>
                </div>
            </button>
        </div>
    )
}
