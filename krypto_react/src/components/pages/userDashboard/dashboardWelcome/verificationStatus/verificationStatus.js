import React, { useState, useContext, useEffect } from "react";
import getRoute from "../../../../routing/routingService";
import i18next from "i18next";
import { UserContext } from "../../../../user/userContext";

import "./verificationStatus.scss";

import Button from "../../../../ui/button/button";

const VerificationStatus = () => {
    const userContext = useContext(UserContext);
    const userData = userContext.data.user;

    const [verificationStatus, setVerificationStatus] = useState("");
    const [verificationStatusName, setVerificationStatusName] = useState();
    const [
        verificationStatusMessage,
        setVerificationStatusMessage,
    ] = useState();

    useEffect(() => {
        const statusNames = ["Ukończono", "Dokończ weryfikację"];
        const messages = [
            "Twoje konto jest w pełni zweryfikowane",
            "Dokończ weryfikację konta",
        ];

        if (userData.verificationStatus === 8) {
            setVerificationStatus("success");
            setVerificationStatusName(i18next.t(statusNames[0]));
            setVerificationStatusMessage(messages[0]);
        } else {
            setVerificationStatus("warning");
            setVerificationStatusName(i18next.t(statusNames[1]));
            setVerificationStatusMessage(i18next.t(messages[1]));
        }
    }, []);

    return (
        <>
            <div className="verificationStatusContent">
                <h3 className="title">{i18next.t("Weryfikacja")}</h3>
                <div className="statusBox">
                    <div className={`status ${verificationStatus}`}>
                        {i18next.t(verificationStatusName)}
                    </div>
                    <div className="statusMessage">
                        {userData.verificationStatus !== 8 ? (
                            <Button
                                className="warning"
                                to={getRoute("userDashboardVerification")}
                            >
                                {i18next.t(verificationStatusMessage)}
                            </Button>
                        ) : (
                            i18next.t(verificationStatusMessage)
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerificationStatus;
