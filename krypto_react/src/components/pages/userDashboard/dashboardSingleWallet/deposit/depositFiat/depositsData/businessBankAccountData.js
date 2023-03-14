import React, { useContext } from "react";
import i18next from "i18next";

import { UserContext } from "../../../../../../user/userContext";
import { AppContext } from "../../../../../../appContext";

import Infobox from "../../../../../../ui/infobox/infobox";
import InputCopyFrom from "../../../../../../ui/inputCopyFrom/inputCopyFrom";

const BusinessBankAccountData = (props) => {
    const user = useContext(UserContext);
    const app = useContext(AppContext);

    return (
        <>
            <div className="transferTitle">
                <Infobox type={"warning"}>
                    <span>{i18next.t("Tytuł przelewu")}: </span>
                    {props.walletShortName}
                    {app.data.depositBusinessSufix}
                    {user.data.user.id}
                </Infobox>
            </div>
            <div className="bankBic">
                {i18next.t("BIC")}: {i18next.t(app.data.depositBusinessBankBic)}
            </div>

            <div className="bankAccountNumber">
                {i18next.t("Numer konta")}:<br />
                <InputCopyFrom
                    value={app.data.depositBusinessBankAccountNumber}
                    rightIcon={"content_copy"}
                />
            </div>

            <div className="recipientData">
                <Infobox type={"gray"}>
                    <span>{i18next.t("Odbiorca")}:</span>
                    {app.data.depositBusinessAccountData[0]}
                    <br />
                    {app.data.depositBusinessAccountData[1]}
                    <br />
                    {app.data.depositBusinessAccountData[2]}
                </Infobox>
            </div>
        </>
    );
};

export default BusinessBankAccountData;
