import React, { useState } from "react";
import "./passwordResetBox.scss";
import Infobox from "../../../ui/infobox/infobox";
import i18next from "i18next";
import Input from "../../../ui/input/input";
import Button from "../../../ui/button/button";
import ReCAPTCHA from "react-google-recaptcha";
import PostThis from "../../../../scripts/post";
import Loader from "../../../ui/loader/loader";

const PasswordResetBox = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const recaptchaRef = React.createRef();
    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const handleEmailChange = (inputId, value) => {
        setEmail(value);
    };
    const onReCaptchaChange = (key) => {
        console.log("Captcha value: " + key);
        setRecaptchaValue(key);
    };

    const sendPasswordResetRequest = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const response = await PostThis(
            "/resetting/request",
            "POST",
            {
                email: email,
                ["g-recaptcha-response"]: recaptchaValue,
            },
            ""
        );

        setLoading(false);
        if (response.status >= 200 && response.status < 300) {
            setSuccess(true);
        } else {
            setError(response.data.message);
        }
    };

    if (success) {
        return (
            <div className={"passwordResetBox"}>
                <Infobox animation={"wobble"} icon={"done"}>
                    {i18next.t(
                        "Na podany adres e-mail został wysłany link resetujący hasło."
                    )}
                </Infobox>
            </div>
        );
    }
    return (
        <div className={"passwordResetBox"}>
            <Infobox animation={"wobble"} icon={"refresh"}>
                {i18next.t("Aby zresetować hasło podaj email swojego konta.")}
            </Infobox>
            <form onSubmit={sendPasswordResetRequest}>
                <Input
                    id={"email"}
                    value={email}
                    type={"email"}
                    onChange={handleEmailChange}
                    label={i18next.t("E-mail")}
                />
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
                <Button blue type={"submit"}>
                    {i18next.t("Wyślij prośbę o reset hasła")}
                </Button>
                {isLoading ? <Loader absolute /> : null}
            </form>
        </div>
    );
};

export default PasswordResetBox;
