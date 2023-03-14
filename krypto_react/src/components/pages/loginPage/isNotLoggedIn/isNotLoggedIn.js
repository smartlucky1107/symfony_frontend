import React from "react";
import "./isNotLoggedIn.scss";
import i18next from "i18next";
import Button from "../../../ui/button/button";
import getRoute from "../../../routing/routingService";
import { Link } from "react-router-dom";
import LoginComponent from "../loginComponent/loginComponent";
import Infobox from "../../../ui/infobox/infobox";

const IsNotLoggedIn = (props) => {
    let alert = (
        <Infobox animation={"wobble"} icon={"perm_identity"}>
            {i18next.t(
                "Zaloguj się na swoje konto by przejść do panelu użytkownika."
            )}
        </Infobox>
    );

    if (props.alert === "toContinue") {
        alert = (
            <Infobox animation={"wobble"} icon={"error_outline"}>
                {i18next.t("Aby kontynuować musisz być zalogowany!")}
            </Infobox>
        );
    }
    return (
        <div className={"isNotLoggedIn"}>
            <div className={"content"}>
                <div className={"loginBox"}>
                    {alert}

                    <LoginComponent />
                </div>

                <div className={"registerBox"}>
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
                <Link to={getRoute("terms")}>{i18next.t("Regulamin")}</Link>{" "}
                {i18next.t("oraz")}{" "}
                <Link to={getRoute("privacyPolicy")}>
                    {i18next.t("Politykę prywatności")}
                </Link>
            </div>
        </div>
    );
};

export default IsNotLoggedIn;
