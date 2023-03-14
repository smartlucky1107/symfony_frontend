import React, { useContext } from "react";
import i18next from "i18next";

import { UserContext } from "./../../../../user/userContext";

import getRoute from "./../../../../routing/routingService";
import RoundIcon from "./../../../../ui/roundicon/roundIcon";
import Button from "./../../../../ui/button/button";

import "./dashboardVerifyAccount.scss";

const DashboardVerifyAccount = () => {
    const userContext = useContext(UserContext);
    const userData = userContext.data.user;

    return (
        <>
            <section className="dashboardVerifyAccount">
                <h1 className="stdDashboardHeader">
                    {i18next.t("Witaj")} {userData.firstName}
                </h1>
                <div className="bg-w">
                    <div className="dashboardIntroduce">
                        <p>
                            {i18next.t(
                                "Twoje konto nie jest jeszcze zweryfikowane, aby w pełni korzystać z usług kryptowaluty.pl należy dokonać weryfikacji konta. Weryfikacja to proces błyskawiczny, który trwa zwykle do kilku minut."
                            )}
                        </p>
                    </div>

                    <div className="contentBox">
                        <div className="contentIconBox">
                            <RoundIcon btype="Dashed" content="1" />
                        </div>
                        <h3 className="title">
                            {i18next.t(
                                "Przygotuj dokumenty oraz zdjęcie swojej twarzy"
                            )}
                        </h3>
                        <p>
                            {i18next.t(
                                "Do weryfikacji Twojego konta potrzebne będą dokumenty potwierdzające Twoją tożsamość oraz zdjęcie Twojej twarzy, w celu potwierdzenia że osoba z dokumentu to Ty."
                            )}
                        </p>
                        <p>
                            {i18next.t(
                                "Może to być jeden z poniższych dokumentów, jeśli jest ważny przez minimum następne 6 miesięcy"
                            )}
                            :
                        </p>
                        <ul className="customList dashList">
                            <li>{i18next.t("Dowód osobisty")}</li>
                            <li>{i18next.t("Prawo jazdy")}</li>
                            <li>{i18next.t("Paszport")}</li>
                        </ul>
                    </div>
                    <div className="contentBox">
                        <div className="contentIconBox">
                            <RoundIcon btype="Dashed" content="2" />
                        </div>
                        <h3 className="title">
                            {i18next.t("Rozpocznij proces weryfikacji")}
                        </h3>
                        <p>
                            {i18next.t(
                                "Możesz teraz przystąpić do weryfikacji. Wgraj pliki, o które poprosi Cię system, a następnie poczekaj kilka minut na przetworzenie weryfikacji przez system. W skrajnych przypadkach może to zająć chwilkę dłużej."
                            )}
                        </p>
                        <Button
                            to={getRoute("userDashboardVerification")}
                            rightIcon={"verified_user"}
                        >
                            {i18next.t("Rozpocznij weryfikację")}
                        </Button>
                    </div>
                    <div className="contentBox">
                        <div className="contentIconBox">
                            <RoundIcon btype="Dashed" content="3" />
                        </div>
                        <h3 className="title">
                            {i18next.t(
                                "System przetworzy Twoje zgłoszenie, możesz zamknąć panel"
                            )}
                        </h3>
                        <p>
                            {i18next.t(
                                "Po pomyslnym wysłaniu plików (gdy wyskoczy informacja, że Twoje pliki są przetwarzane) możesz bez obaw wyjść z panelu weryfikacji. Po zakończeniu przetwarzania system stwierdzi, czy Twoja weryfikacja zostanie zaakceptowana czy odrzucona. "
                            )}
                            <strong>
                                {i18next.t(
                                    "Proces przetwarzania zwykle trwa do 3 minut."
                                )}
                            </strong>
                        </p>
                        <p>
                            {i18next.t("W")}
                            <span className="error">
                                {i18next.t("przypadku odrzucenia wniosku")}
                            </span>{" "}
                            {i18next.t("przez system, upewnij się że")}:
                        </p>
                        <ul className="customList dashList">
                            <li>
                                {i18next.t(
                                    "Dane na Twoich dokumentach są wyraźnie czytelne,"
                                )}
                            </li>
                            <li>
                                {i18next.t(
                                    "Twoje zdjęcie nie jest rozmazane, a twarz jest widoczna w kadrze wraz z obrysem twarzy,"
                                )}
                            </li>
                            <li>
                                {i18next.t(
                                    "Na zdjęciu twarzy nie ma dodatkowych osób,"
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DashboardVerifyAccount;
