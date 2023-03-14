import React, { useRef, useState, useContext } from "react";
import i18next from "i18next";
import getRoute from "../../routing/routingService";
import { NavLink, Link } from "react-router-dom";

import { UserContext } from "../../user/userContext";

import "./mobileNavModal.scss";

const MobileNavModal = () => {
    const user = useContext(UserContext);
    // const [windowWidth, setWindowWidth] = useState();
    const [showMore, setShowMore] = useState();

    const mobileNavModalRef = useRef(null);
    const buyIconRef = useRef(null);

    const handleShowMore = () => {
        mobileNavModalRef.current.classList.toggle("active");
    };

    return (
        <div className="mobileNavModal" ref={mobileNavModalRef}>
            <div className="iconsRow">
                <NavLink
                    exact
                    strict
                    className="iconBox"
                    to={getRoute("userDashboardWelcome")}
                    activeClassName="active"
                >
                    <span className="material-icons icon">home</span>
                    <div className="iconsName">{i18next.t("Dashboard")}</div>
                </NavLink>
                <NavLink
                    className="iconBox"
                    to={getRoute("userDashboardWallets")}
                    activeClassName="active"
                >
                    <span className="material-icons icon">
                        account_balance_wallet
                    </span>
                    <div className="iconsName">{i18next.t("Portfel")}</div>
                </NavLink>
                <NavLink
                    className="iconBox buyIcon"
                    to={getRoute("transactionBuy")}
                    ref={buyIconRef}
                >
                    <span className="material-icons icon">shopping_cart</span>

                    <div className="iconsName">{i18next.t("Kup Bitcoina")}</div>
                </NavLink>
                <NavLink
                    className="iconBox"
                    to={getRoute("userDashboardReferral")}
                    activeClassName="active"
                >
                    {/* <span className="material-icons">campaign</span> */}
                    <span className="material-icons icon">
                        supervisor_account
                    </span>
                    <div className="iconsName">{i18next.t("Polecaj")}</div>
                </NavLink>
                <div
                    className="iconBox"
                    onClick={() => {
                        handleShowMore();
                    }}
                >
                    <span className="material-icons icon">more_horiz</span>
                    <div className="iconsName">{i18next.t("Więcej")}</div>
                </div>
            </div>
            <div className="iconsRow">
                <NavLink
                    className="iconBox"
                    to={getRoute("userDashboardVerification")}
                    activeClassName="active"
                >
                    <span className="material-icons icon">verified_user</span>
                    <div className="iconsName">{i18next.t("Weryfikacja")}</div>
                </NavLink>
                <NavLink
                    className="iconBox"
                    to={getRoute("userDashboardHistory")}
                    activeClassName="active"
                >
                    <span className="material-icons icon">poll</span>
                    <div className="iconsName">{i18next.t("Historia")}</div>
                </NavLink>
                <NavLink
                    className="iconBox"
                    to={getRoute("userDashboardPaymentcards")}
                    activeClassName="active"
                >
                    <span className="material-icons icon">credit_card</span>
                    <div className="iconsName">{i18next.t("Karty")}</div>
                </NavLink>
                {/* <NavLink
                    className="iconBox"
                    to={getRoute("userDashboardWelcome")}
                    activeClassName="active"
                >
                    <span className="material-icons icon">more_horiz</span>
                    <div className="iconsName">{i18next.t("Więcej")}</div>
                </NavLink> */}
                <NavLink
                    className="iconBox"
                    to={getRoute("userDashboardSettings")}
                    activeClassName="active"
                >
                    <span className="material-icons">settings</span>
                    <div className="iconsName">{i18next.t("Ustawienia")}</div>
                </NavLink>
            </div>
        </div>
    );
};

export default MobileNavModal;
