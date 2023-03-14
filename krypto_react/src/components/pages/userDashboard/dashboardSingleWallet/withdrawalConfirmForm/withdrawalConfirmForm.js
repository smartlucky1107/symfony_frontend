import React, { useState, useContext, useEffect } from "react";
import i18next from "i18next";

import "./withdrawalConfirmForm.scss";

import { UserContext } from "../../../../user/userContext";
import PostThis from "../../../../../scripts/post";
import Input from "../../../../ui/input/input";
import Button from "../../../../ui/button/button";
import Infobox from "../../../../ui/infobox/infobox";
import Preloader from "../../../../ui/preloader/preloader";

const WithdrawalConfirmForm = (props) => {
    const user = useContext(UserContext);

    const [confirmationCode, setConfirmationCode] = useState("");
    const [gAuthCode, setGAuthCode] = useState("");
    const [preloader, setPreloader] = useState("");
    const [showFormMsg, setShowFormMsg] = useState(false);
    const [formStatus, setFormStatus] = useState(false);
    const [formMsg, setFormMsg] = useState(i18next.t("Błąd"));
    const [contentText, setContentText] = useState(
        i18next.t("Podaj kod, który wysłaliśmy na Twój adres email.")
    );

    const handleConfirmationCodeChange = (inputId, value) => {
        setConfirmationCode(value);
    };
    const handleGAuthCodeChange = (inputId, value) => {
        setGAuthCode(value);
    };

    const handleSubmitConfirmForm = async (e) => {
        setPreloader(true);
        e.preventDefault();

        const response = await PostThis(
            props.api,
            "PATCH",
            { confirmationHash: confirmationCode, gAuthCode: gAuthCode },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );
        // confirmationCodeRef.current.classList.add("hide");

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setShowFormMsg(true);
                setFormStatus("success");
                setFormMsg(i18next.t("Przelew przekazany do realizacji"));
                setContentText("");
                props.setConfirmationFormStatus("sended");

                setTimeout(() => {
                    props.handleClosePopup(props.popupRef);
                }, 5000);
            } else if (response.status === 403) {
                user.logout();
            } else {
                setShowFormMsg(true);
                setFormStatus("warning");
                setFormMsg(i18next.t(response.data.message));
            }
            setPreloader(false);
        }
    };

    useEffect(() => {
        setContentText(
            i18next.t("Podaj kod, który wysłaliśmy na Twój adres email.")
        );
        setShowFormMsg(false);
        setFormStatus(false);
        setConfirmationCode("");
        setGAuthCode("");
        setFormMsg("");
    }, [props.api]);

    return (
        <>
            <div className="withdrawalConfirmForm preloaderWrapper">
                <Preloader show={preloader} />
                <div className="textCenter">
                    <h3>{i18next.t("Potwierdź przelew")}</h3>
                    <p>{contentText}</p>
                </div>

                {showFormMsg ? (
                    <Infobox icon={"info"} type={formStatus}>
                        {formMsg}
                    </Infobox>
                ) : (
                    ""
                )}

                <form onSubmit={(e) => handleSubmitConfirmForm(e)} className="">
                    <Input
                        id={"confirmationCode"}
                        value={confirmationCode}
                        type={formStatus === "success" ? "hidden" : "text"}
                        onChange={handleConfirmationCodeChange}
                        label={i18next.t("Kod potwierdzający")}
                        required
                    ></Input>
                    {user.data.user.isGAuthEnabled ? (
                        <Input
                            id={"gAuthCode"}
                            value={gAuthCode || ""}
                            type={formStatus === "success" ? "hidden" : "text"}
                            onChange={handleGAuthCodeChange}
                            label={i18next.t("Kod GAuth")}
                            required
                        ></Input>
                    ) : (
                        ""
                    )}
                    <Button
                        hidden={formStatus === "success" ? "true" : ""}
                        type="submit"
                        rightIcon={"done"}
                    >
                        {i18next.t("Potwierdź")}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default WithdrawalConfirmForm;
