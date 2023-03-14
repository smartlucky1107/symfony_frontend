import React from "react";
import i18next from "i18next";
import { Link } from "react-router-dom";
import getRoute from "../../routing/routingService";
import "./loginOrRegister.scss";
import Button from "../../ui/button/button";
import OutsideClickHandler from "react-outside-click-handler";

const ModalLoginOrRegister = (props) => {
    return (
        <div className={"modalWrapper loginOrRegister"}>
            <OutsideClickHandler onOutsideClick={() => props.closeModal()}>
                <div className={"modal"}>
                    <div className={"header"}>
                        {i18next.t("Zaloguj się by kontynuować")}
                    </div>
                    <div className={"content"}>
                        <div className={"modalContainer loginBox"}>
                            {i18next.t(
                                "Aby kontynuować musisz być zalogowany."
                            )}
                        </div>

                        <div className={"modalContainer registerBox"}>
                            <div className={"registerText"}>
                                {i18next.t(
                                    "Jeśli nie masz jeszcze konta, możesz założyć je zupełnie za darmo w kilka minut!"
                                )}
                            </div>
                            <div className={"registerBtn"}>
                                <Button to={getRoute("register")}>
                                    {i18next.t("Załóż konto")}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={"footer"}>
                        {i18next.t(
                            "Dokonując transakcji i korzystając z serwisu akceptujesz"
                        ) + " "}
                        <Link to={getRoute("terms")}>
                            {i18next.t("Regulamin")}
                        </Link>{" "}
                        {i18next.t("oraz")}{" "}
                        <Link to={getRoute("privacyPolicy")}>
                            {i18next.t("Politykę prywatności")}
                        </Link>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default ModalLoginOrRegister;
