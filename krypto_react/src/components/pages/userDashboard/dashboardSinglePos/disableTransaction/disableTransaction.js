import React, { useState, useEffect, useContext } from "react";
import i18next from "i18next";
import "./disableTransaction.scss";

import { UserContext } from "../../../../user/userContext";

import PostThis from "../../../../../scripts/post";

import Button from "../../../../ui/button/button";
import Input from "../../../../ui/input/input";
import Infobox from "../../../../ui/infobox/infobox";
import Error from "../../../../ui/errorBox/error";
import Preloader from "../../../../ui/preloader/preloader";

const DisableTransaction = (props) => {
    const user = useContext(UserContext);
    const [currentPrice, setCurrentPrice] = useState("124");
    const [confirmCode, setConfirmCode] = useState("");
    const [confirmCodeError, setConfirmCodeError] = useState(false);
    const [confirmCodeErrorMsg, setConfirmCodeErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );

    const [showFormMsg, setShowFormMsg] = useState(false);
    const [formStatus, setFormStatus] = useState(false);
    const [formMsg, setFormMsg] = useState("");
    const [preloader, setPreloader] = useState(false);

    const handleConfirmCodeChange = (inputId, value) => {
        setConfirmCode(value);
    };
    const handleGetCurrentPrice = () => {};

    const handleDisableTransactionForm = async (e) => {
        e.preventDefault();
        setPreloader(true);
        const response = await PostThis(
            `/api/users/me/pos/${props.posId}`,
            "POST",
            {
                id: props.posId,
                gAuthCode: confirmCode,
            },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );
        if (response) {
            setPreloader(false);
            if (response.status >= 200 && response.status < 300) {
                setShowFormMsg(true);
                setFormStatus("success");
                setFormMsg(i18next.t("Transakcja zostanie anulowana"));
            } else {
                setShowFormMsg(true);
                setFormStatus("warning");
                setFormMsg(i18next.t(response.data.message));
            }

            setTimeout(() => {
                props.handleClosePopup(props.popupRef);
            }, 5000);
        }
    };

    return (
        <>
            <div className="disableTransaction preloaderWrapper">
                <Preloader show={preloader} />
                <div className="textCenter">
                    <h3>
                        {i18next.t("Anulowanie transakcji")}: {props.posId}
                    </h3>
                    <p>{i18next.t("Transakcja zostanie anulowana")}</p>
                </div>
                <p>
                    {i18next.t("Kurs realizacji zlecenia")}: {props.totalPrice}
                    <br />
                    {i18next.t("Aktualny kurs")}: {currentPrice}
                </p>

                {showFormMsg ? (
                    <Infobox icon={"info"} type={formStatus}>
                        {formMsg}
                    </Infobox>
                ) : (
                    ""
                )}

                <form
                    onSubmit={(e) => handleDisableTransactionForm(e)}
                    className=""
                >
                    {user.data.user.isGAuthEnabled ? (
                        <Input
                            id={"confirmCode"}
                            value={confirmCode | ""}
                            type={"text"}
                            onChange={handleConfirmCodeChange}
                            label={i18next.t("Kod GAuth")}
                            required
                        ></Input>
                    ) : (
                        ""
                    )}
                    {confirmCodeError ? (
                        <Error
                            msg={confirmCodeErrorMsg}
                            rel="confirmCodeError"
                            side="top"
                        ></Error>
                    ) : (
                        ""
                    )}

                    <Button type="submit" rightIcon={"highlight_off"}>
                        {i18next.t("Anuluj transakcję")}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default DisableTransaction;
