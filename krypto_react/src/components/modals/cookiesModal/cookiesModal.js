import React, { useEffect, setState, useState } from "react";
import { Link } from "react-router-dom";
import getRoute from "../../routing/routingService";
import i18next from "i18next";

import Button from "../../ui/button/button";
import { setCookie, getCookie } from "../../../scripts/cookies";

import "./cookiesModal.scss";
const CookiesModal = () => {
    const [showCookiesModal, setShowCookiesModal] = useState(false);

    const handleAcceptCookies = () => {
        setCookie("cookies", true, 365);
        setShowCookiesModal(true);
    };

    useEffect(() => {
        setShowCookiesModal(getCookie("cookies"));
    }, [showCookiesModal]);

    return (
        <>
            <div
                className="cookiesModal"
                style={{ display: showCookiesModal ? "none" : "block" }}
            >
                <div className="cookiesModalContent">
                    <p>
                        {i18next.t(
                            "Wyrażam zgodę na przetwarzanie danych osobowych na zasadach określonych w"
                        )}{" "}
                        <Link to={getRoute("terms")}>
                            {i18next.t("regulaminie")}
                        </Link>{" "}
                        {i18next.t("oraz")}{" "}
                        <Link to={getRoute("privacyPolicy")}>
                            {i18next.t("polityce prywatności")}
                        </Link>
                        .{" "}
                        {i18next.t(
                            "Jeśli nie wyrażasz zgody na wykorzystywanie cookies we wskazanych w niej celach, prosimy o wyłącznie cookies w przeglądarce lub opuszczenie serwisu."
                        )}
                    </p>
                    <Button thin onClick={() => handleAcceptCookies()}>
                        {i18next.t("Akceptuję")}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CookiesModal;
