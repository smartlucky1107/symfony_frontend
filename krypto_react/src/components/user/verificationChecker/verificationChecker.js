import React, { useContext } from "react";
import "./verificationChecker.scss";
import { UserContext } from "../userContext";
import i18next from "i18next";
import Button from "../../ui/button/button";
import getRoute from "../../routing/routingService";
import VerificationImg from "./../../../img/verificationChecker.svg";

export const VerificationChecker = (props) => {
    const user = useContext(UserContext);
    console.log(user.data.user.isTier3Approved);
    if (user.data.user.isTier3Approved === true) {
        return props.children;
    } else {
        return (
            <div className={"verificationChecker"}>
                <div className={"reason"}>
                    {i18next.t(
                        "Aby dokonać transakcji Twoje konto musi być w pełni zweryfikowane."
                    )}
                </div>
                <div className={"aditionalImg"}>
                    <img
                        src={VerificationImg}
                        alt={i18next.t("Zweryfikuj swoje konto")}
                    />
                </div>
                <div className={"additional"}>
                    {i18next.t("Weryfikacja zajmie Ci tylko kilka minut.")}
                </div>
                <div className={"btns"}>
                    <Button big blue to={getRoute("userDashboardVerification")}>
                        {i18next.t("Rozpocznij weryfikację")}
                    </Button>
                </div>
            </div>
        );
    }
};
