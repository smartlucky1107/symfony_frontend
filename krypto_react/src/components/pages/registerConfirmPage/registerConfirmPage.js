import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import i18next from "i18next";
import Header from "../../head/header";
import Footer from "../../foot/footer";
import "./registerConfirmPage.scss";
import PostThis from "../../../scripts/post";
import Loader from "../../ui/loader/loader";
import Button from "../../ui/button/button";
import getRoute from "../../routing/routingService";
import ErrorImg from "./../../../img/error.svg";
import SuccessImg from "./../../../img/success.svg";

const RegisterConfirmPage = (props) => {
    const currentUrl = window.location.href.includes("?")
        ? window.location.href.split("?")[0]
        : window.location.href;

    const [accountConfirmed, setAccountConfirmed] = useState(null);

    useEffect(() => {
        confirmAccount();
    }, []);

    const confirmAccount = async () => {
        const response = await PostThis(
            "/user/confirm",
            "POST",
            {
                confirmationToken: props?.match?.params?.confirmationHash,
                email: props?.match?.params?.email,
            },
            ""
        );

        if (response.status >= 200 && response.status < 300) {
            setAccountConfirmed(true);
        } else {
            setAccountConfirmed(false);
        }
    };

    const renderCurrentStep = () => {
        switch (accountConfirmed) {
            case null:
                return (
                    <Loader
                        absolute
                        label={i18next.t("Trwa aktywacja konta")}
                    />
                );
                break;

            case false:
                return (
                    <div className={"accountConfirmedBoxWrapper"}>
                        <div className={"accountConfirmedImg"}>
                            <img src={ErrorImg} />
                        </div>
                        <div className={"accountConfirmedBox error"}>
                            <div className={"title"}>{i18next.t("Oops!")}</div>
                            <div className={"content"}>
                                {i18next.t(
                                    "Link aktywacyjny wygasł lub użytkownik nie istnieje."
                                )}
                            </div>
                            <div className={"buttons"}>
                                <Button big blue to={getRoute("login")}>
                                    {i18next.t("Zaloguj się")}
                                </Button>
                            </div>
                        </div>
                    </div>
                );
                break;

            case true:
                return (
                    <div className={"accountConfirmedBoxWrapper"}>
                        <div className={"accountConfirmedImg"}>
                            <img src={SuccessImg} />
                        </div>
                        <div className={"accountConfirmedBox success"}>
                            <div className={"title"}>
                                {i18next.t("Konto zostało aktywowane!")}
                            </div>
                            <div className={"content"}>
                                {i18next.t(
                                    "Twoje konto zostało pomyślnie aktywowane, możesz teraz się zalogować i rozpocząć weryfikację swojego konta, by móc w pełni korzystać z funkcjonalności kryptowaluty.pl"
                                )}
                            </div>
                            <div className={"buttons"}>
                                <Button big blue to={getRoute("login")}>
                                    {i18next.t("Zaloguj się")}
                                </Button>
                            </div>
                        </div>
                    </div>
                );
                break;
        }
    };

    return (
        <div className={"registerConfirmPage"}>
            <Helmet>
                <title>{i18next.t("REGISTER_CONFIRM_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("REGISTER_CONFIRM_PAGE_DESC")}
                />
                <link rel="canonical" href={currentUrl} />
                <link
                    rel="alternate"
                    hrefLang={i18next.language}
                    href={currentUrl}
                />
            </Helmet>
            <Header />
            <div className={"container flex"}>
                <div className={"narrowContainer"}>{renderCurrentStep()}</div>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterConfirmPage;
