import React, { useState } from "react";
import "./../../passwordResetPage/passwordResetBox/passwordResetBox.scss";
import Infobox from "../../../ui/infobox/infobox";
import i18next from "i18next";
import Input from "../../../ui/input/input";
import Button from "../../../ui/button/button";
import ReCAPTCHA from "react-google-recaptcha";
import PostThis from "../../../../scripts/post";
import Loader from "../../../ui/loader/loader";

const PasswordResetConfirmBox = (props) => {
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handlePasswordChange = (inputId, value) => {
        setPassword(value);
    };
    const handleRepasswordChange = (inputId, value) => {
        setRepassword(value);
    };

    const sendPasswordResetConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const response = await PostThis(
            "/resetting/confirm",
            "POST",
            {
                email: props.match.params.email,
                confirmationToken: props.match.params.hash,
                password: password,
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
                    {i18next.t("Hasło zostało pomyślnie zmienione.")}
                </Infobox>
            </div>
        );
    }

    return (
        <div className={"passwordResetBox"}>
            <Infobox animation={"wobble"} icon={"refresh"}>
                {i18next.t(
                    "Poniżej możesz ustawić nowe hasło dla Twojego konta"
                )}
            </Infobox>
            <form onSubmit={sendPasswordResetConfirm}>
                <Input
                    id={"password"}
                    value={password}
                    type={"password"}
                    onChange={handlePasswordChange}
                    label={i18next.t("Nowe hasło")}
                />
                <Input
                    id={"repassword"}
                    value={repassword}
                    type={"password"}
                    onChange={handleRepasswordChange}
                    label={i18next.t("Powtórz hasło")}
                />
                {error ? (
                    <Infobox type={"error"} icon={"sync_problem"}>
                        {error}
                    </Infobox>
                ) : null}
                <Button blue type={"submit"}>
                    {i18next.t("Potwierdź nowe hasło")}
                </Button>
                {isLoading ? <Loader absolute /> : null}
            </form>
        </div>
    );
};

export default PasswordResetConfirmBox;
