import React from "react";
import "./referralCodeOnly.scss";
import InputCopyFrom from "../../../../ui/inputCopyFrom/inputCopyFrom";
import i18next from "i18next";

export const ReferralCodeOnly = ({ referralLink }) => {
    let referralCode = referralLink.split("/");
    referralCode = referralCode[referralCode.length - 1];

    return (
        <div className={"referralCodeOnly"}>
            <div className={"referralCodeOnlyLabel"}>
                {i18next.t("Twój kod polecający") + ":"}
            </div>
            <div className={"referralCodeOnlyInputBox"}>
                <InputCopyFrom
                    value={referralCode}
                    rightIcon={"add_to_photos"}
                />
            </div>
        </div>
    );
};
