import React, { useContext } from "react";
import i18next from "i18next";
import "./logoutButton.scss";
import { UserContext } from "../userContext";

const LogoutButton = () => {
    const user = useContext(UserContext);

    const handleLogoutClick = () => {
        user.logout();
    };

    return (
        <button
            className={"logoutButton"}
            title={i18next.t("Wyloguj")}
            onClick={handleLogoutClick}
        >
            <span className="material-icons">power_settings_new</span>
        </button>
    );
};

export default LogoutButton;
