import React from "react";
import i18next from "i18next";
import RoundIcon from "./../../../ui/roundicon/roundIcon";

import "./advantageSection.scss";

const AdvantageSection = () => {
    return (
        <>
            <section className="container advantageSection">
                <header>
                    <h1 className="dashBrdHeader">
                        <span>
                            {i18next.t("Poznaj zalety")}{" "}
                            <strong className="blue">
                                {i18next.t("bezpłatnego")}
                            </strong>{" "}
                            {i18next.t("konta")}
                        </span>
                    </h1>
                </header>
                <div className="content">
                    {i18next.language === "pl-PL" ||
                    i18next.language === "pl" ? (
                        <>
                            <div className="col">
                                <div className="contentBox">
                                    <div className="contentIconBox">
                                        <RoundIcon
                                            btype="Dashed"
                                            icon="account_balance_wallet"
                                        />
                                    </div>
                                    <h3 className="title">
                                        {i18next.t(
                                            "Bezpłatne portfele kryptowalutowe"
                                        )}
                                    </h3>
                                    <p>
                                        {i18next.t(
                                            "Otrzymujesz bezpłatny dostęp do aplikacji obsługującej portfele kryptowalutowe. Zarządzaj swoimi środkami szybko, łatwo i bezpiecznie!"
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="contentBox">
                                    <div className="contentIconBox">
                                        <RoundIcon
                                            btype="Dashed"
                                            icon="credit_card"
                                        />
                                    </div>
                                    <h3 className="title">
                                        {i18next.t("Szybkie płatności kartą")}
                                    </h3>
                                    <p>
                                        {i18next.t(
                                            "Obsługujemy karty płatnicze takie jak VISA oraz Master Card. Szybko wpłacaj pieniądze, bez długiego oczekiwania!"
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="contentBox">
                                    <div className="contentIconBox">
                                        <RoundIcon
                                            btype="Dashed"
                                            icon="verified_user"
                                        />
                                    </div>
                                    <h3 className="title">
                                        {i18next.t(
                                            "Błyskawiczna weryfikacji konta"
                                        )}
                                    </h3>
                                    <p>
                                        {i18next.t(
                                            "Weryfikacja w naszym systemie jest w pełni zautomatyzowana, dzięki czemu decyzja weryfikacyjna dostępna jest w ciągu kilku minut od wysłania dokumentów."
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="contentBox">
                                    <div className="contentIconBox">
                                        <RoundIcon
                                            btype="Dashed"
                                            icon="supervisor_account"
                                        />
                                    </div>
                                    <h3 className="title">
                                        {i18next.t(
                                            "Zarabiaj na programie poleceń"
                                        )}
                                    </h3>
                                    <p>
                                        {i18next.t(
                                            "Zapraszaj znajomych i zarabiaj na transakcjach! Za każdą zrealizowaną wymianę, dokonaną przez osobę poleconą, otrzymujesz część zysku z prowizji."
                                        )}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </section>
        </>
    );
};
export default AdvantageSection;
