import React, { useContext, useState } from "react";
import { UserContext } from "./userContext";
import "./userMenu.scss";
import { Link } from "react-router-dom";
import getRoute from "../routing/routingService";

const UserMenu = (props) => {
    const user = useContext(UserContext);
    return (
        <div className={"userMenu"}>
            <Link to={getRoute("userDashboardWelcome")}>
                <div className={"userIcon"}>
                    <span className="material-icons">person</span>
                </div>
                <div className={"userName"}>{user.data.user.fullName}</div>
            </Link>
        </div>
    );
};
export default UserMenu;
