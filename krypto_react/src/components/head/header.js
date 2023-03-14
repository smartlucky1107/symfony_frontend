import React, { useContext, useEffect, useState } from "react";
// import Logo from "./../../img/logo.svg";
import Logo from "./../../img/logomain.png";
import i18next from "i18next";
import getRoute from "../routing/routingService";
import UserMenu, { UserMenuTest, UserMenuTestTwo } from "../user/userMenu";
import Button from "../ui/button/button";
import "./header.scss";
import { UserContext } from "../user/userContext";
import { SmallNotifications } from "../notifications/notifications";
import OutsideClickHandler from "react-outside-click-handler";
import { Link } from "react-router-dom";
import LogoutButton from "../user/logout/logoutButton";
import { ModalControllerContext } from "../modals/modalControllerContext";
import UserComponentLoader from "./userComponent/loader/userComponentLoader";
import NotificationsWebsocket from "../notifications/notificationsWebsocket/notificationsWebsocket";

import HeaderBar from "./headerBar/headerBar";

const Header = (props) => {
    const MAIN_PAGE_TITLE = i18next.t("MAIN_PAGE_TITLE");
    const user = useContext(UserContext);
    //const modalController = useContext(ModalControllerContext);
    const [isActive, setActive] = useState(false);

    const renderUserComponent = () => {
        if (user.data.isLoggedIn === null) {
            return <UserComponentLoader />;
        }
        if (user.data.user !== null) {
            return (
                <>
                    <div className={"userMenuContainer"}>
                        <UserMenu />
                    </div>

                    {/*<div className={'notificationsContainer'}>
                                        <SmallNotifications/>
                                    </div>*/}
                    <div className={"logoutContainer"}>
                        <LogoutButton />
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <ul>
                        <li>
                            <Link to={getRoute("login")}>
                                {i18next.t("Zaloguj")}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={getRoute("register")}
                                className={"registerBtn"}
                            >
                                {i18next.t("Załóż konto")}
                            </Link>
                        </li>
                    </ul>
                </>
            );
        }
    };

    return (
        <div className={"headerWrapper"}>
            <HeaderBar />
            <div
                className={`
            header 
            ${props.roundedCorner ? "roundedCorner" : ""}
            `}
            >
                <div className={"container"}>
                    <div className={"logoContainer"}>
                        <a href={getRoute("main")} title={MAIN_PAGE_TITLE}>
                            <img src={Logo} alt={MAIN_PAGE_TITLE} />
                        </a>
                    </div>
                    <OutsideClickHandler
                        onOutsideClick={() => {
                            setActive(false);
                        }}
                    >
                        <div
                            className={`hamburger ${isActive ? "active" : ""}`}
                            onClick={() => setActive(!isActive)}
                        >
                            <span className="material-icons">menu</span>
                        </div>
                        <div className={`allMenus ${isActive ? "active" : ""}`}>
                            <div className={"menuContainer"}>
                                <ul>
                                    <li>
                                        <Link to={getRoute("howToBuy")}>
                                            {/* {i18next.t(
                                                "Jak kupić kryptowaluty?"
                                            )} */}
                                            {i18next.t(
                                                "Jak kupić?"
                                            )}
                                        </Link>

                                        <ul>
                                            <li>
                                                <Link
                                                    to={getRoute(
                                                        "howToRegister"
                                                    )}
                                                >
                                                    {i18next.t(
                                                        "Jak założyć konto?"
                                                    )}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={getRoute(
                                                        "howToBuyBitcoin"
                                                    )}
                                                >
                                                    {i18next.t(
                                                        "Jak kupić Bitcoin?"
                                                    )}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={getRoute(
                                                        "howToBuyEthereum"
                                                    )}
                                                >
                                                    {i18next.t(
                                                        "Jak kupić Ethereum?"
                                                    )}
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                            {/* {i18next.t("Ofetra dla kantorów")} */}
                                    {/* <li>
                                        <Link to={getRoute("forPartners")}>
                                    
                                            
                                            {i18next.t("O nas")}
                                        </Link>
                                    </li> */}

                                    <li>
                                    <Link to={getRoute("aboutUs")}>
                                          {i18next.t("O nas")}
                                     </Link>
                                    </li>
                                    <li>
                                        <Link to={getRoute("forPartners")}>
                                            {/* {i18next.t("Ofetra dla kantorów")} */}
                                            {i18next.t("Status transakcji")}
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link to={getRoute("forPartners")}>
                                           
                                            {i18next.t("Pomoc")}
                                        </Link>
                                    </li> */}
                                    
                                   
                                    

                                    <li className={"separator"}></li>
                                    <li>
                                        <Link to={getRoute("transactionBuy")}>
                                            <span className="material-icons">
                                                add_shopping_cart
                                            </span>
                                            {i18next.t("Kup")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={getRoute("transactionSell")}>
                                            <span className="material-icons">
                                                monetization_on
                                            </span>
                                            {i18next.t("Sprzedaj")}
                                        </Link>
                                    </li>
                                 </ul>
                            </div>

                            <div className={"accountMenuContainer"}>
                                {renderUserComponent()}
                            </div>
                            {/* <div className="rightBlok">                   
                                 <Button className="btn1 w150">
                                   {i18next.t("Zaloguj się")}
                                 </Button>
                                  <Button className="btn1 w150">
                                    {i18next.t("Załóż konto")} 
                                  </Button>                            
                            </div> */}

                        </div>
                       
                    </OutsideClickHandler>
                </div>
            </div>
        </div>
    );
};

export default Header;
