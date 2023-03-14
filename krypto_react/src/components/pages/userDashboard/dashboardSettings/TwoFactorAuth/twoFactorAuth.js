import React, { useState, useContext, useEffect, useReducer } from "react";
import i18next from "i18next";
import axios from "axios";

import { UserContext } from "../../../../user/userContext";

import appStoreImg from "../../../../../img/appstore.svg";
import googlePlayImg from "../../../../../img/googleplay.png";

import PostThis from "../../../../../scripts/post";

import Input from "../../../../ui/input/input";
import Button from "../../../../ui/button/button";
import Error from "../../../../ui/errorBox/error";

const TwoFactorAuth = () => {
    const user = useContext(UserContext);
    const [twoFactorSend, setTwoFactorSend] = useState({
        twoFactorSendSuccess: false,
        twoFactorSendError: false,
        twoFactorSendMsg: "",
    });
    const [qrCodeUrl, setQrCodeUrl] = useState();
    const [secretCode, setSecretCode] = useState();
    const [authCode, setAuthCode] = useState();

    const [formError, setFormError] = useState({
        show: "",
        msg: "",
    });

    const handleGAuth = async (e) => {
        e.preventDefault();
        setFormError({ show: false });
        const response = await PostThis(
            "/api/users/me/gauth",
            "PATCH",
            { secret: secretCode, "g-auth-code": authCode },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setTwoFactorSend({
                    twoFactorSendSuccess: true,
                    twoFactorSendError: false,
                    twoFactorSendMsg: "Autoryzacja dodana",
                });
                setTimeout(() => {
                    setTwoFactorSend({
                        twoFactorSendSuccess: false,
                        twoFactorSendError: false,
                        twoFactorSendMsg: "",
                    });
                    user.reload();
                    setAuthCode("");
                }, 3000);
            } else if (response.status === 403) {
                user.logout();
            } else {
                if (response.data?.message) {
                    setFormError({ show: true, msg: response.data?.message });
                }
            }
        }
    };

    const handleAuthCodeChange = (inputId, value) => {
        setAuthCode(value);
    };

    const handleDisableGAuth = async (e) => {
        e.preventDefault();
        setFormError({ show: false });
        const response = await PostThis(
            "/api/users/me/gauth-disable",
            "PATCH",
            { secret: secretCode, "g-auth-code": authCode },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setTwoFactorSend({
                    twoFactorSendSuccess: true,
                    twoFactorSendError: false,
                    twoFactorSendMsg: "Autoryzacja wyłączona",
                });

                setTimeout(() => {
                    setTwoFactorSend({
                        twoFactorSendSuccess: false,
                        twoFactorSendError: false,
                        twoFactorSendMsg: "",
                    });

                    user.reload();
                    setAuthCode("");
                }, 3000);
            } else if (response.status === 403) {
                user.logout();
            } else {
                setTwoFactorSend({
                    twoFactorSendSuccess: false,
                    twoFactorSendError: true,
                    twoFactorSendMsg: response.data?.message,
                });
                setTimeout(() => {
                    setTwoFactorSend({
                        twoFactorSendSuccess: false,
                        twoFactorSendError: false,
                        twoFactorSendMsg: "",
                    });
                }, 3000);
            }
        }
    };

    const handleGet2FAData = async (cancelToken) => {
        const response = await PostThis(
            "/api/users/me/gauth",
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            },
            "",
            cancelToken
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setSecretCode(response.data.secret);
                setQrCodeUrl(response.data.qrUrl);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        handleGet2FAData(source.token);

        return () => {
            source.cancel();
        };
    }, []);

    return (
        <div className="row rowBox">
            <div className="col col-xl-6 tfab1">
                <div className="content">
                    <h3 className="title">
                        {i18next.t("Skonfiguruj swoją autoryzację dwuetapową")}
                    </h3>

                    <ul className="customList numberList">
                        <li>
                            <span>1</span>
                            {i18next.t(
                                "Pobierz aplikację Google Authenticator a swój smartfon"
                            )}
                            <div>
                                <a
                                    href="https://apps.apple.com/pl/app/google-authenticator/id388497605"
                                    title="Pobierz Google Authenticator z App Store"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={appStoreImg}
                                        alt={i18next.t(
                                            "Pobierz Google Authenticator z App Store"
                                        )}
                                    />
                                </a>

                                <a
                                    href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                                    title="Pobierz Google Authenticator z Google Play"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={googlePlayImg}
                                        alt={i18next.t(
                                            "Pobierz Google Authenticator z Google Play"
                                        )}
                                    />
                                </a>
                            </div>
                        </li>
                        <li>
                            <span>2</span>
                            {i18next.t(
                                "Zeskanuj kod QR lub przepisz kod do swojej aplikacji"
                            )}
                        </li>
                        <li>
                            <span>3</span>
                            {i18next.t(
                                "W polu poniżej kodem QR, podaj kod wygenerowany przez aplikację Google Authenticator"
                            )}
                        </li>
                        <li>
                            <span>4</span>
                            {i18next.t(
                                "Kliknij Włącz 2FA - Jesteś gotów do używania swojej weryfikacji dwuetapowej (2FA)!"
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col col-xl-6">
                <div className="content preloaderWrapper qr">
                    {twoFactorSend.twoFactorSendSuccess === true &&
                    twoFactorSend.twoFactorSendError === false ? (
                        <div className="responseContent succesContent">
                            <div className="circle">
                                <div className="border"></div>
                                <span className="material-icons icon">
                                    thumb_up
                                </span>
                            </div>
                            <h3>
                                {i18next.t("Sukces")}
                                <br />
                                {i18next.t(twoFactorSend.twoFactorSendMsg)}
                            </h3>
                        </div>
                    ) : (
                        ""
                    )}
                    {twoFactorSend.twoFactorSendSuccess === false &&
                    twoFactorSend.twoFactorSendError === true ? (
                        <div className="responseContent errorContent">
                            <div className="circle">
                                <div className="border"></div>
                                <span className="material-icons icon">
                                    highlight_off
                                </span>
                            </div>
                            <h3>{i18next.t(twoFactorSend.twoFactorSendMsg)}</h3>
                        </div>
                    ) : (
                        ""
                    )}

                    {user.data.user.isGAuthEnabled === false ? (
                        <>
                            <h3 className="title">
                                {i18next.t(
                                    "Zeskanuj kod QR lub użyj kodu tekstowego"
                                )}
                            </h3>
                            <div className="qrCode">
                                <img src={qrCodeUrl} alt="" />
                            </div>
                            <div className="secretCode">{secretCode}</div>
                        </>
                    ) : (
                        <>
                            <h3 className="title red">
                                {i18next.t("Wyłącz autoryzacje dwustopniową")}
                            </h3>
                        </>
                    )}

                    {user.data.user.isGAuthEnabled === false ? (
                        <form
                            className="authCode"
                            onSubmit={(e) => {
                                handleGAuth(e);
                            }}
                        >
                            <Input
                                id={"authCode"}
                                value={authCode ?? ""}
                                type={"text"}
                                onChange={handleAuthCodeChange}
                                placeholder={i18next.t("2FA Kod")}
                            />
                            <Button type="submit" rightIcon="security">
                                {i18next.t("Włącz 2FA")}
                            </Button>

                            {formError.show ? (
                                <Error msg={formError.msg} side="top"></Error>
                            ) : (
                                ""
                            )}
                        </form>
                    ) : (
                        <form
                            className="authCode"
                            onSubmit={(e) => {
                                handleDisableGAuth(e);
                            }}
                        >
                            <Input
                                id={"authCode"}
                                value={authCode ?? ""}
                                type={"text"}
                                onChange={handleAuthCodeChange}
                                placeholder={i18next.t("2FA Kod")}
                            />
                            <Button type="submit" rightIcon="security">
                                {i18next.t("Wyłącz autoryzację dwuetapową")}
                            </Button>

                            {formError.show ? (
                                <Error msg={formError.msg} side="top"></Error>
                            ) : (
                                ""
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TwoFactorAuth;
