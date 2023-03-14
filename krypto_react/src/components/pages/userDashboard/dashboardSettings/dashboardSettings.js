import React, { useContext, useState, useEffect, useRef } from "react";

import i18next from "i18next";
import ReCAPTCHA from "react-google-recaptcha";

import UserDashboard from "./../userDashboard";
import { UserContext } from "../../../user/userContext";

import PostThis from "../../../../scripts/post";
import Button from "../../../ui/button/button";
import Loader from "../../../ui/loader/loader";

import Error from "../../../ui/errorBox/error";
import Infobox from "../../../ui/infobox/infobox";

import "./dashboardSettings.scss";

// import settingsImg from "./../../../../img/settings.svg";
import settingsImg from "../../../../img/accountsetting.png";
import AccountData from "./accountData/accountData";
import UserData from "./userData/userData";
import TwoFactorAuth from "./TwoFactorAuth/twoFactorAuth";

const DashboardSettings = () => {
    const user = useContext(UserContext);

    const [formPassStatus, setFormPassStatus] = useState();
    const [formPassMsg, setFormPassMsg] = useState();
    const [recaptchaReq, setRecaptchaReq] = useState();

    const [preloader, setPreloader] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState();

    const recaptchaRef = useRef();
    const TWOFA = useRef(null);
    const onReCaptchaChange = (key) => {
        setRecaptchaValue(key);
    };

    const handleResetPassword = async () => {
        if (recaptchaValue) {
            setPreloader(true);

            const response = await PostThis(
                "/resetting/request",
                "POST",
                {
                    email: user.data.user?.email,
                    "g-recaptcha-response": recaptchaValue,
                },
                {
                    Authorization: "Bearer " + user.data.user?.authToken,
                }
            );

            if (response) {
                if (response.status >= 200 && response.status < 300) {
                    setFormPassStatus(null);
                    setFormPassMsg(i18next.t(""));
                    setRecaptchaReq(false);
                    setFormPassStatus("success");
                    setFormPassMsg(
                        i18next.t(
                            "Mail potwierdzający zmianę hasła został wysłany. Sprawdź swoją skrzynkę pocztową."
                        )
                    );
                } else if (response.status === 403) {
                    user.logout();
                } else {
                    setFormPassStatus("warning");
                    setFormPassMsg(i18next.t("Błąd, zaznacz brakujące pola."));
                }
            }
            setPreloader(false);
        } else {
            setRecaptchaReq(true);
            setTimeout(() => {
                setRecaptchaReq(false);
            }, 5000);
        }
    };

    const handleToggleClass = (ref, className) => {
        ref.current.classList.toggle(className);
        setTimeout(() => {
            ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
    };

    useEffect(() => {}, [user]);

    return (
        <UserDashboard>
            <section className="dashboardSettings">
                <h1 className="stdDashboardHeader">
                    {i18next.t("Ustawienia konta")}
                </h1>
                <div className="bg-w pt0">
                    <div className="row rowBox dashboardIntroduce">
                        <div className="col col-xl-9">
                            <p>
                                {i18next.t(
                                    "W tym panelu możesz sprawdzić ustawienia swojego konta, dodać autoryzację dwustopniową oraz zresetować swoje hasło. Szczególnie zalecamy używanie autoryzacji dwustopniowej, ponieważ znacząco zwiększa ona bezpieczeństwo Twojego konta."
                                )}
                            </p>
                        </div>
                        <div className="col col-xl-3 contentImg">
                            <img src={settingsImg} alt="" />
                        </div>
                    </div>

                    <div className="row rowBox">
                        <div className="col col-xl-6">
                            <UserData />
                        </div>
                        <div className="col col-xl-6">
                            <AccountData />
                        </div>
                    </div>
                    <div className="row rowBox">
                        <div className="col col-xl-6">
                            <div className="content resetPassword preloaderWrapper">
                                {preloader ? (
                                    <Loader
                                        absolute
                                        label={i18next.t("Przesyłanie")}
                                    />
                                ) : (
                                    ""
                                )}
                                <h3 className="title">
                                    {i18next.t("Twoje hasło")}
                                </h3>
                                {formPassStatus ? (
                                    <Infobox
                                        icon={"info"}
                                        type={formPassStatus}
                                    >
                                        {formPassMsg}
                                    </Infobox>
                                ) : (
                                    ""
                                )}
                                <Button
                                    rightIcon="vpn_key"
                                    onClick={(e) => {
                                        handleResetPassword(e);
                                    }}
                                >
                                    {i18next.t("Zresetuj hasło")}
                                </Button>
                                <ReCAPTCHA
                                    className={"recaptchaContainer"}
                                    ref={recaptchaRef}
                                    sitekey={
                                        process.env
                                            .REACT_APP_RECAPTCHA_PUBLIC_KEY
                                    }
                                    onChange={onReCaptchaChange}
                                />

                                {recaptchaReq ? (
                                    <Error
                                        msg={i18next.t("reCaptch wymagana")}
                                        side="top"
                                    ></Error>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="col col-xl-6">
                            <div className="content">
                                <h3 className="title">
                                    {i18next.t(
                                        "Autoryzacja dwustopniowa (2FA)"
                                    )}
                                </h3>
                                <p>
                                    {i18next.t(
                                        "Autoryzacja dwustopniowa generuje dodatkowy kod w aplikacji Google Authenticator na telefonie, którego używasz do logowania oraz potwierdzania transakcji."
                                    )}
                                </p>
                                <Button
                                    rightIcon="security"
                                    onClick={(e) =>
                                        handleToggleClass(TWOFA, "show")
                                    }
                                >
                                    {i18next.t(
                                        "Skonfiguruj autoryzację dwustopniową"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="twoFactor" ref={TWOFA}>
                        <TwoFactorAuth />
                    </div>
                </div>
            </section>
        </UserDashboard>
    );
};
export default DashboardSettings;
