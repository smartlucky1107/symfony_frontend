import React, { useContext } from "react";
import i18next from "i18next";
import Button from "./../../../ui/button/button";
import getRoute from "../../../routing/routingService";

import { UserContext } from "../../../user/userContext";

import "./dashboardNav.scss";

const DashboardNav = () => {
    const user = useContext(UserContext);

    const handleLogoutClick = () => {
        user.logout();
    };

    return (
        <>
            <nav className="dashboardNav">
                <ul>
                    <li>
                        <Button className="sidebarBtn"
                            to={getRoute("userDashboardVerification")}
                            rightIcon={"verified_user"}
                            navLink
                        >
                            {i18next.t("Zweryfikuj się")}
                        </Button>
                    </li>
                    <li>
                        <Button className="sidebarBtn"
                            to={getRoute("userDashboardWallets")}
                            rightIcon={"account_balance_wallet"}
                            navLink
                        >
                            {i18next.t("Portfele")}
                        </Button>
                    </li>
                    <li>
                        <Button className="sidebarBtn"
                            to={getRoute("userDashboardHistory")}
                            rightIcon={"poll"}
                            navLink
                        >
                            {i18next.t("Historia transakcji")}
                        </Button>
                    </li>
                    <li>
                        <Button className="sidebarBtn"
                            to={getRoute("userDashboardPaymentcards")}
                            rightIcon={"credit_card"}
                            navLink
                        >
                            {i18next.t("Karty płatnicze")}
                        </Button>
                    </li>
                    {user.data.user.type === 3 ? (
                        <li>
                            <Button className="sidebarBtn"
                                to={getRoute("userDashboardWorkspace")}
                                rightIcon={"business_center"}
                                navLink
                            >
                                {i18next.t("Workspace")}
                            </Button>
                        </li>
                    ) : (
                        ""
                    )}

                    <li>
                        <Button className="sidebarBtn"
                            to={getRoute("userDashboardReferral")}
                            rightIcon={"group"}
                            navLink
                        >
                            {i18next.t("Poleć znajomym")}
                        </Button>
                    </li>

                    <li>
                        <Button className="sidebarBtn"
                            to={getRoute("userDashboardSettings")}
                            rightIcon={"settings"}
                            navLink
                        >
                            {i18next.t("Ustawienia")}
                        </Button>
                    </li>
                    <li>
                        <Button className="sidebarBtn power"
                            rightIcon={"power_settings_new"}
                            onClick={handleLogoutClick}
                            navLink
                        >
                            {i18next.t("Wyloguj")}
                        </Button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default DashboardNav;
