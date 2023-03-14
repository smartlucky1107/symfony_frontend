import React, { useContext, useEffect, useRef, useState } from "react";

import "./loginComponent.scss";
import Input from "../../../ui/input/input";
import i18next from "i18next";
import Button from "../../../ui/button/button";
import ReCAPTCHA from "react-google-recaptcha";
import PostThis from "../../../../scripts/post";
import Infobox from "../../../ui/infobox/infobox";
import { UserContext } from "../../../user/userContext";
import { setCookie, getCookie } from "../../../../scripts/cookies";
import Preloader from "../../../ui/preloader/preloader";
import Loader from "../../../ui/loader/loader";
import { Link } from "react-router-dom";
import getRoute from "../../../routing/routingService";

const LoginComponent = () => {
    const user = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const recaptchaRef = useRef();
    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const [isGAuthActive, setGAuthActive] = useState(null);
    const [GAuth, setGAuth] = useState("");

    const [error, setError] = useState(false);

    const [isLoading, setLoading] = useState(false);

    const sendPreAuthRequest = async () => {
        const response = await PostThis(
            "/pre-auth",
            "POST",
            {
                email: email,
            },
            ""
        );
        console.log(response);
        if (response.status === 200) {
            if (response.data.isGAuth === false) {
                sendLoginRequest();
            }
            if (response.data.isGAuth === true) {
                setLoading(false);
            }
            return setGAuthActive(response.data.isGAuth);
        } else if (response.status === 500) {
            return setError(
                i18next.t(
                    "Wystąpił błąd, sprawdź swoje połączenie i spróbuj ponownie."
                )
            );
        }
    };

    const sendLoginRequest = async () => {
        const response = await PostThis(
            "/login_check",
            "POST",
            {
                ["g-auth-code"]: GAuth,
                ["g-recaptcha-response"]: recaptchaValue,
                password: pass,
                username: email,
            },
            ""
        );
        if (response.status === 200) {
            if (response.data.token) {
                setCookie("authToken", response.data.token, 1);
                return user.reload();
            } else {
                return setError(
                    i18next.t(
                        "Zweryfikuj swoje konto przy użyciu linku wysłanego na Twój email!"
                    )
                );
            }
        } else {
            if (recaptchaRef.current !== null) {
                recaptchaRef.current.reset();
            }
            setLoading(false);
            if (response.status === 403) {
                return setError(
                    i18next.t(
                        "Zweryfikuj swoje konto przy użyciu linku wysłanego na Twój email!"
                    )
                );
            }
            return setError(response.data.message);
        }
    };

    const handleGAuthChange = (inputId, value) => {
        setGAuth(value);
    };
    const handleEmailChange = (inputId, value) => {
        setEmail(value);
    };
    const handlePassChange = (inputId, value) => {
        setPass(value);
    };

    const onReCaptchaChange = (key) => {
        console.log("Captcha value: " + key);
        setRecaptchaValue(key);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        if (isGAuthActive === null) {
            await sendPreAuthRequest();
        }
        if (isGAuthActive !== null) {
            await sendLoginRequest();
        }
    };

    useEffect(() => {
        setGAuthActive(null);
    }, [email]);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <form className={"loginComponent"} onSubmit={handleSubmit}>
            {isLoading ? (
                <Loader absolute label={i18next.t("Trwa autoryzacja...")} />
            ) : null}
            {isGAuthActive ? (
                <Input
                    id={"GAuth"}
                    value={GAuth}
                    type={"text"}
                    onChange={handleGAuthChange}
                    label={i18next.t("Kod Google Authenticatora")}
                />
            ) : (
                <>
                    <Input
                        id={"login"}
                        value={email}
                        type={"text"}
                        onChange={handleEmailChange}
                        label={i18next.t("E-mail")}
                    />
                    <Input
                        id={"pass"}
                        value={pass}
                        type={"password"}
                        onChange={handlePassChange}
                        label={i18next.t("Hasło")}
                    />
                </>
            )}
            <ReCAPTCHA
                className={"recaptchaContainer"}
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY}
                onChange={onReCaptchaChange}
            />
            {error ? (
                <Infobox type={"error"} icon={"sync_problem"}>
                    {error}
                </Infobox>
            ) : null}
            <Button blue big onClick={handleSubmit}>
                {i18next.t("Zaloguj się")}
            </Button>

            <Link to={getRoute("passwordreset")} className={"passwordReset"}>
                {i18next.t("Resetuj hasło")}
            </Link>
        </form>
    );
};

export default LoginComponent;
